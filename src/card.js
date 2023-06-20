/* eslint-disable */
import classNames from 'classnames';
import React from 'react';

function Card(props) {
  const { rowIdx, cellIdx } = props.point;
  return (
    <div className="cardWrapper">
      <div
        className={classNames({ card: true }, { selectedCard: props.card === 1 })}
        data-rowidx={rowIdx}
        data-cellidx={cellIdx}
        data-name="card">
        {/*{props.card}*/}
      </div>
    </div>
  );
}

export default React.memo(Card);
