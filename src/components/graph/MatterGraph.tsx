import React, { useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLedger } from '../../context/LedgerContext';
import {
  MatterNode,
  InstitutionNode,
  SourceRecordNode,
  StageNode,
  AlertNode,
} from './CustomNodes';
import { MatterThread, RecordRelation, SourceRecord } from '../../types';
import { formatRelationshipType } from '../../utils/formatters';
import { Drawer } from '../ui/Drawer';
import { EvidenceDrawer } from './EvidenceDrawer';
import { ConfirmModal } from '../ui/ConfirmModal';
import { LayoutGrid, Network, Info, Eye, ShieldAlert, Sparkles } from 'lucide-react';

const nodeTypes: NodeTypes = {
  matterNode: MatterNode,
  institutionNode: InstitutionNode,
  sourceRecordNode: SourceRecordNode,
  stageNode: StageNode,
  alertNode: AlertNode,
};

interface MatterGraphProps {
  matter: MatterThread;
  onOpenCoordinationBrief?: () => void;
}

export const MatterGraph: React.FC<MatterGraphProps> = ({
  matter,
  onOpenCoordinationBrief,
}) => {
  const {
    institutions,
    sourceRecords,
    relations,
    alerts,
    inspectingRelation,
    setInspectingRelation,
    confirmReviewAction,
  } = useLedger();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeReviewAction, setActiveReviewAction] = useState<
    'CONFIRMED' | 'REJECTED' | 'DEFERRED' | 'RECLASSIFIED'
  >('CONFIRMED');

  const institution = institutions.find((i) => i.id === matter.institutionId);
  const memberRecords = sourceRecords.filter((r) => matter.recordIds.includes(r.id));
  const matterAlerts = alerts.filter(
    (a) => a.threadId === matter.id && !a.isResolved
  );

  // Build Graph Nodes & Edges dynamically
  const { nodes, edges } = useMemo(() => {
    const n: Node[] = [];
    const e: Edge[] = [];

    // 1. Root Matter Node
    n.push({
      id: `matter-${matter.id}`,
      type: 'matterNode',
      position: { x: 380, y: 30 },
      data: {
        code: matter.code,
        title: matter.title,
        institutionName: matter.institutionName,
        recordCount: matter.recordIds.length,
        hasIntegrityFlag: matter.hasIntegrityFlag,
      },
    });

    // 2. Institution Node
    if (institution) {
      n.push({
        id: `inst-${institution.id}`,
        type: 'institutionNode',
        position: { x: 80, y: 200 },
        data: {
          canonicalName: institution.canonicalName,
          permanentId: institution.permanentId,
          state: institution.state,
        },
      });

      e.push({
        id: `e-matter-inst`,
        source: `matter-${matter.id}`,
        target: `inst-${institution.id}`,
        label: 'Concerning Institution',
        style: { stroke: '#4AA3DF', strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#4AA3DF' },
      });
    }

    // 3. Integrity Alert Node if present
    if (matterAlerts.length > 0) {
      const mainAlert = matterAlerts[0];
      n.push({
        id: `alert-${mainAlert.id}`,
        type: 'alertNode',
        position: { x: 680, y: 190 },
        data: {
          title: mainAlert.title,
          humanDescription: mainAlert.humanDescription,
          originBureau: mainAlert.originBureau,
        },
      });

      e.push({
        id: `e-matter-alert`,
        source: `matter-${matter.id}`,
        target: `alert-${mainAlert.id}`,
        label: 'Critical Anomaly',
        style: { stroke: '#D95C5C', strokeWidth: 2, strokeDasharray: '4 4' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#D95C5C' },
      });
    }

    // 4. Source Record Nodes (Level 3)
    const startX = 60;
    const spacingX = 260;
    memberRecords.forEach((rec, idx) => {
      const recNodeId = `rec-${rec.id}`;
      n.push({
        id: recNodeId,
        type: 'sourceRecordNode',
        position: { x: startX + idx * spacingX, y: 380 },
        data: {
          sourceSystemCode: rec.sourceSystemCode,
          sourceRef: rec.sourceRef,
          title: rec.title,
          bureauName: rec.bureauName,
          openedAt: rec.openedAt,
        },
      });

      // Edge from Institution to Record
      if (institution) {
        e.push({
          id: `e-inst-${rec.id}`,
          source: `inst-${institution.id}`,
          target: recNodeId,
          style: { stroke: '#284157', strokeWidth: 1 },
        });
      }
    });

    // 5. Connect Source Records based on relations
    relations.forEach((rel) => {
      const fromExists = memberRecords.some((r) => r.id === rel.fromRecordId);
      const toExists = memberRecords.some((r) => r.id === rel.toRecordId);

      if (fromExists && toExists) {
        const isConfirmed = rel.state === 'CONFIRMED';
        const isProposed = rel.state === 'PROPOSED';
        const isParallel = rel.relType === 'RELATED_BUT_INDEPENDENT';

        const strokeColor = isParallel
          ? '#4AA3DF'
          : isConfirmed
          ? '#1EA7A8'
          : '#D89B32';

        e.push({
          id: `e-rel-${rel.id}`,
          source: `rec-${rel.fromRecordId}`,
          target: `rec-${rel.toRecordId}`,
          label: formatRelationshipType(rel.relType).label,
          animated: isProposed,
          style: {
            stroke: strokeColor,
            strokeWidth: isConfirmed ? 2.5 : 2,
            strokeDasharray: isProposed ? '5 5' : undefined,
          },
          labelStyle: { fill: strokeColor, fontWeight: 600, fontSize: 10 },
          labelBgStyle: { fill: '#0B1724', fillOpacity: 0.9 },
          labelBgPadding: [6, 4],
          markerEnd: { type: MarkerType.ArrowClosed, color: strokeColor },
        });
      }
    });

    // 6. Primary Track Procedural Stages (Level 4)
    const primaryTrack = matter.parallelTracks[0];
    if (primaryTrack && primaryTrack.stages) {
      const stageStartX = 120;
      const stageSpacingX = 230;
      primaryTrack.stages.slice(0, 4).forEach((st, sIdx) => {
        const stageNodeId = `stage-${st.id}`;
        n.push({
          id: stageNodeId,
          type: 'stageNode',
          position: { x: stageStartX + sIdx * stageSpacingX, y: 580 },
          data: {
            stageCode: st.stageCode,
            stageName: st.stageName,
            status: st.status,
            decisionBody: st.decisionBody,
          },
        });

        if (sIdx > 0) {
          const prevStageId = `stage-${primaryTrack.stages[sIdx - 1].id}`;
          e.push({
            id: `e-stage-flow-${sIdx}`,
            source: prevStageId,
            target: stageNodeId,
            style: { stroke: '#4AA3DF', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#4AA3DF' },
          });
        }
      });
    }

    return { nodes: n, edges: e };
  }, [matter, institution, memberRecords, matterAlerts, relations]);

  // Click handler to open Evidence Drawer on edge or node
  const onEdgeClick = (_: any, edge: Edge) => {
    if (edge.id.startsWith('e-rel-')) {
      const relId = edge.id.replace('e-rel-', '');
      const rel = relations.find((r) => r.id === relId);
      if (rel) {
        setInspectingRelation(rel);
      }
    }
  };

  const onNodeClick = (_: any, node: Node) => {
    if (node.id.startsWith('rec-')) {
      const recId = node.id.replace('rec-', '');
      // Find a relation associated with this record
      const relatedRel = relations.find(
        (r) => r.fromRecordId === recId || r.toRecordId === recId
      );
      if (relatedRel) {
        setInspectingRelation(relatedRel);
      }
    }
  };

  return (
    <div className="relative w-full h-[620px] rounded-panel overflow-hidden border border-navy-border shadow-dark-elevated bg-navy-bg">
      {/* Top Overlay Legend & Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-3 bg-navy-surface/90 backdrop-blur-md px-4 py-2.5 rounded-card border border-navy-border text-xs text-navy-text shadow-dark-subtle">
        <div className="flex items-center gap-1.5 font-semibold text-brand-teal">
          <Network className="w-4 h-4" />
          <span>Interactive Relationship Network</span>
        </div>
        <div className="h-3 w-px bg-navy-border" />
        <div className="flex items-center gap-3 text-[11px] text-navy-textSecondary">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-brand-teal inline-block" /> Confirmed Link
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-status-warning inline-block" /> Proposed Link
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-brand-sky inline-block" /> Parallel Track
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-status-critical inline-block" /> Anomaly Flag
          </span>
        </div>
      </div>

      {/* React Flow Visual Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="#172D42" gap={20} size={1} />
        <Controls position="bottom-right" />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === 'matterNode') return '#1EA7A8';
            if (n.type === 'alertNode') return '#D95C5C';
            if (n.type === 'institutionNode') return '#4AA3DF';
            return '#112335';
          }}
          maskColor="rgba(11, 23, 36, 0.7)"
          className="!bg-navy-surface !border-navy-border !rounded-card overflow-hidden"
        />
      </ReactFlow>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-[11px] text-navy-textMuted bg-navy-surface/80 px-3 py-1.5 rounded-lg border border-navy-border">
        <Info className="w-3.5 h-3.5 text-brand-sky" />
        <span>Click any node or relationship line to inspect evidence, scores, and provenance rules.</span>
      </div>

      {/* Evidence Drawer */}
      <Drawer
        isOpen={!!inspectingRelation}
        onClose={() => setInspectingRelation(null)}
        title="Why are these records connected?"
        subtitle={`Relationship ${inspectingRelation?.id} between intake records`}
      >
        {inspectingRelation && (
          <EvidenceDrawer
            relation={inspectingRelation}
            fromRecord={sourceRecords.find((r) => r.id === inspectingRelation.fromRecordId)}
            toRecord={sourceRecords.find((r) => r.id === inspectingRelation.toRecordId)}
            onOpenReview={() => setReviewModalOpen(true)}
          />
        )}
      </Drawer>

      {/* Review Dialog from Graph */}
      {inspectingRelation && (
        <ConfirmModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onConfirm={async (data) => {
            await confirmReviewAction(
              inspectingRelation.id,
              data.decision,
              data.reclassifiedType,
              data.reason,
              data.notes
            );
            setInspectingRelation(null);
          }}
          action={activeReviewAction}
          proposedType={inspectingRelation.proposedType}
          fromRecordRef={
            sourceRecords.find((r) => r.id === inspectingRelation.fromRecordId)?.sourceRef || 'Record A'
          }
          toRecordRef={
            sourceRecords.find((r) => r.id === inspectingRelation.toRecordId)?.sourceRef || 'Record B'
          }
        />
      )}
    </div>
  );
};

