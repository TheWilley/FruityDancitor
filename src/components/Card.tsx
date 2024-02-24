import { ReactNode } from 'react';

/**
 * A card-alike component - strives to resemble Google Cards.
 * @param props A object containing component properties.
 * @param props.children Child nodes to be rendered within component.
 * @param props.className HTML classes to be applied onto the component.
 * @param props.id HTML id to be applied onto the component.
 * @see https://m2.material.io/components/cards.
 */
function Card(props: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div className={`card overflow-auto bg-base-100 ${props.className}`} id={props.id}>
      {props.children}
    </div>
  );
}

export default Card;
