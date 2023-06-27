'use client';

import { styled } from '@nextui-org/react';
import { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  EdgeTypes,
  NodeChange,
  NodeTypes,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { featureFlag } from '../../environment';
import { useJsonDiagramViewStore } from '../../store/json-diagram-view/json-diagram-view.store';
import { EdgeType } from '../../store/json-engine/enums/edge-type.enum';
import { NodeType } from '../../store/json-engine/enums/node-type.enum';
import { useJsonEngineStore } from '../../store/json-engine/json-engine.store';
import { useLandingStore } from '../../store/landing/landing.store';
import { useSettingsStore } from '../../store/settings/settings.store';
import { useIsMounted } from '../../utils/react-hooks/useIsMounted';
import { ArrayNode } from './ArrayNode';
import { ChainEdge } from './ChainEdge';
import { CustomMiniMap } from './CustomMiniMap';
import { DefaultEdge } from './DefaultEdge';
import { DownloadImageButton } from './DownloadImageButton';
import { FitViewInvoker } from './FitViewInvoker';
import { ObjectNode } from './ObjectNode';
import { PrimitiveNode } from './PrimitiveNode';

const nodeTypes: NodeTypes = {
  [NodeType.Object]: ObjectNode,
  [NodeType.Array]: ArrayNode,
  [NodeType.Primitive]: PrimitiveNode,
};

const edgeTypes: EdgeTypes = {
  [EdgeType.Default]: DefaultEdge,
  [EdgeType.Chain]: ChainEdge,
};

const _JsonDiagram = () => {
  const [seaNodes, setSeaNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const isMinimapOn = useSettingsStore((state) => state.isMinimapOn);
  const jsonTree = useJsonEngineStore((state) => state.jsonTree);
  const initApp = useLandingStore((state) => state.initApp);
  const selectNode = useJsonDiagramViewStore((state) => state.selectNode);

  const isMounted = useIsMounted();

  useEffect(() => {
    const { seaNodes, edges } = jsonTree;

    setSeaNodes(seaNodes);
    setEdges(edges);

    if (seaNodes.length > 0) {
      selectNode(seaNodes[0].id);
    }
  }, [jsonTree, selectNode, setSeaNodes, setEdges]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => setSeaNodes((nds) => applyNodeChanges(changes, nds)),
    [setSeaNodes]
  );

  return (
    <S_Host>
      {isMounted && (
        <ReactFlow
          style={{
            height: '100%',
            minHeight: '100%',
          }}
          nodesConnectable={false}
          edgesFocusable={false}
          nodeTypes={nodeTypes}
          nodes={seaNodes}
          edgeTypes={edgeTypes}
          edges={edges}
          onInit={initApp}
          onNodesChange={featureFlag.nodesChange ? handleNodesChange : undefined}
        >
          {isMinimapOn && <CustomMiniMap />}
          <Controls position="bottom-right" showInteractive={false} />
          <DownloadImageButton />
          <Background variant={BackgroundVariant.Dots} />
          <FitViewInvoker seaNodes={seaNodes} />
        </ReactFlow>
      )}
    </S_Host>
  );
};

const S_Host = styled('div', {
  width: '100%',
  height: '100%',

  '.react-flow': {
    backgroundColor: '$backgroundContrast',
  },

  '.react-flow__controls button': {
    backgroundColor: '$background',
    border: '1px solid $border',
    borderBottom: 'none',
  },
  '.react-flow__controls button:hover': {
    backgroundColor: '$gray100',
  },
  '.react-flow__controls button:first-child': {
    borderRadius: '5px 5px 0 0',
  },
  '.react-flow__controls button:last-child': {
    borderBottom: '1px solid $border',
    borderRadius: '0 0 5px 5px',
  },
  '.react-flow__controls button svg': {
    fill: '$text',
    stroke: '$text',
  },

  /**
   * To remove attribution, need some money.
   * @see https://reactflow.dev/docs/guides/remove-attribution/
   */
  '.react-flow__attribution': {
    backgroundColor: 'transparent',
  },
});

export const JsonDiagram = _JsonDiagram;
