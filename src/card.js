import classNames from 'classnames';
import React from 'react'

function Card(props) {
  const {rowIdx, cellIdx} = props.point;
  return (
    <div
      className={
        classNames({ card: true },
          { selectedCard: props.card === 1 }
        )}
      data-rowIdx={rowIdx}
      data-cellIdx={cellIdx}
      data-name="card"
      >
      {/*{props.card}*/}
    </div>
  );
}

export default React.memo(Card)
