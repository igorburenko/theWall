/* eslint-disable */
import Card from './card';
import { useGraph } from './useGraph';
const ROWS = 20;
const COLUMNS = 40;

const matrixRow = new Array(COLUMNS).fill(0);
const initialMatrix = new Array(ROWS).fill(matrixRow);

export function Wall() {
  const { matrix, setMatrix, traverse } = useGraph(initialMatrix);

  const openCard = (startPoint) => {
    traverse([startPoint], 1);
  };
  const closeCard = (startPoint) => {
    traverse([startPoint], 0);
  };

  const onClick = (e) => {
    if (e.target.dataset.name !== 'card') {
      return;
    }
    const rowidx = e.target.dataset.rowidx;
    const cellidx = e.target.dataset.cellidx;
    const startPoint = [Number(rowidx), Number(cellidx)];
    openCard(startPoint)

    setTimeout(() => {
      closeCard(startPoint)
    }, 560)
  };

  return (
    <>
      <div className="wall" onClick={onClick}>
        {matrix.map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {row.map((card, cellIdx) => (
              <Card card={card} point={{ rowIdx, cellIdx }} key={cellIdx + rowIdx} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
