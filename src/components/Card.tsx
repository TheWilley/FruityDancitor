import { ReactNode } from 'react';

/**
 * A card-alike component, strives to resemble Google Cards
 * @see https://m2.material.io/components/cards
 */
function Card(props: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div className={`bg-base-100 card overflow-auto ${props.className}`} id={props.id}>
      {props.children}
    </div>
  );
}

export default Card;
