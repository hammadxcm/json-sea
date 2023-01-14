import { memo, useMemo } from 'react';
import { useHoverNodeDetails } from '../../../store/node-detail-view/hooks/useHoverNodeDetails';
import { isObject } from '../../../utils/json.util';
import { NodeDetailCard } from '../../components/NodeDetailCard';
import { useArrayItemNameTracer } from '../hooks/useArrayItemNameTracer';
import { ArrayItemNameBadge } from './ArrayItemNameBadge';

type Props = {
  parentNodeId: string;
  selfNodeId: string;
  arrayItemIndex: number;
  value: any;
};

const _ArrayItemCard = ({ parentNodeId, selfNodeId, arrayItemIndex, value }: Props) => {
  const { cardRef } = useHoverNodeDetails([{ nodeId: selfNodeId }]);

  const arrayItemName: string = useArrayItemNameTracer({
    parentNodeId,
    selfNodeId,
    lastArrayItemIndex: arrayItemIndex,
  });

  const objectNodeId: string | null = useMemo(() => (isObject(value) ? selfNodeId : null), [value, selfNodeId]);

  return (
    <NodeDetailCard
      ref={cardRef}
      badge={<ArrayItemNameBadge arrayItemName={arrayItemName} />}
      value={value}
      childObjectNodeId={objectNodeId}
    />
  );
};

export const ArrayItemCard = memo(_ArrayItemCard);
