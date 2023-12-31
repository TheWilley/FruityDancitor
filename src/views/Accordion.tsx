import Editor from './editor/Editor';
import Header from './header/Header.tsx';

/**
 * Component which represents an accordion.
 *
 * An accordion is a user interface element that organizes content into collapsible sections,
 * allowing users to expand or collapse individual sections to view or hide their content.
 * For the purpose of this project, it is used to organize elements into the same view.
 */
function Accordion() {
  return (
    <div>
      <Header />
      <Editor />
    </div>
  );
}

export default Accordion;
