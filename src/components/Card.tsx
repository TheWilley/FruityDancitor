import { ReactNode } from 'react';

type CardProps = {
  /**
   * Child nodes to be rendered within component.
   */
  children: ReactNode;
  /**
   * HTML classes to be applied onto the component.
   */
  className?: string;
  /**
   * HTML id to be applied onto the component.
   */
  id?: string;
};

/**
 * Component which represents a card.
 * @param props A object containing component properties.
 * @see https://m2.material.io/components/cards.
 */
function Card(props: CardProps) {
  return (
    <div className={`card overflow-auto bg-base-100 ${props.className}`} id={props.id}>
      {props.children}
    </div>
  );
}

export default Card;
