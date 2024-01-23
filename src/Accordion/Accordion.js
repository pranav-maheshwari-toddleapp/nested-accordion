import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const AccordionItem = ({ item, index, onToggle, isOpen, subItems, depth }) => {
  const handleToggle = () => {
    onToggle(item.id);
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`accordion-test-item depth-${depth}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="accordion-test-title" onClick={handleToggle}>
            {item.title}
          </div>
          {isOpen && subItems.length > 0 && (
            <Droppable droppableId={item.id.toString()} type="nested">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="nested"
                >
                  {subItems.map((subItem, subIndex) => (
                    <AccordionItem
                      key={subItem.id}
                      item={subItem}
                      index={subIndex}
                      onToggle={onToggle}
                      isOpen={isOpen && item.id === subItem.parentId}
                      subItems={[]} // You can provide subItems if needed
                      depth={depth + 1}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      )}
    </Draggable>
  );
};

const NestedAccordion = ({ data }) => {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (itemId) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === itemId ? null : itemId));
  };

  return (
    <Droppable droppableId="nested-accordion" type="root" direction="vertical">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="accordion"
        >
          {data.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              onToggle={handleToggle}
              isOpen={openItem === item.id}
              subItems={data.filter((subItem) => subItem.parentId === item.id)}
              depth={1}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default NestedAccordion;
