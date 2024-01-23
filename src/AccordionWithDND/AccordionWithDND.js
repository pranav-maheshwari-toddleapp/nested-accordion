import React, { useState } from "react";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DUMMY_DATA } from "../DUMMY_DATA";

const AccordionItem = (props) => {
  const { item, data, onToggle, closeditems } = props;
  const { id, title, isSection, level } = item;
  const [isOpen, setIsOpen] = useState(!closeditems?.has(id));

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(id, !isOpen);
  };

  const subItems = data.filter(
    (d) => d.level === item.level + 1 && d.parent === id
  );

  const isStart = item?.level === 1;
  const idx = data.findIndex((d) => d.id === id);
  const isEnd = data.length - 1 === idx || data[idx + 1].level === 1;

  return (
    <>
      <Draggable draggableId={id.toString()} index={idx}>
        {(provided) => (
          <div
            className={classNames("accordion-dnd-container", {
              "accordion-dnd-start": isStart,
              "accordion-dnd-end":
                isEnd || (isSection && !isOpen && level === 1),
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={classNames(
                "accordion-dnd-item",
                `accordion-dnd-item-${level}`
              )}
            >
              <div className="accordion-header">
                {isSection && (
                  <button onClick={handleToggle}>
                    {isOpen ? <span>&darr;</span> : <span>&uarr;</span>}
                  </button>
                )}
                {title}
              </div>
              <button>?</button>
            </div>
          </div>
        )}
      </Draggable>
      {isOpen &&
        subItems.map((subItem) => (
          <AccordionItem {...props} key={subItem.id} item={subItem} />
        ))}
    </>
  );
};

const AccordionWithDND = () => {
  const [data, setData] = useState(DUMMY_DATA);
  const [closeditems, setCloseditems] = useState(new Set());

  const handleToggle = (itemId, isOpen) => {
    const newList = new Set(closeditems);
    if (isOpen) {
      newList.delete(itemId);
    } else {
      newList.add(itemId);
    }
    setCloseditems(newList);
  };

  const onDragEnd = (result) => {
    // Reorder logic
    if (!result.destination) {
      return;
    }

    console.log({ result });

    const reorderedData = Array.from(data);
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);
    console.log({ reorderedData });
    // Update the state or send the updated data to the server
    // setState(reorderedData);
  };

  const rootItems = data.filter((item) => item.level === 1);

  return (
    <div className="accordion">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="nested-accordion" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="accordion-dnd-root"
            >
              {rootItems.map((rootItem) => (
                <AccordionItem
                  key={rootItem.id}
                  item={rootItem}
                  data={data}
                  onToggle={handleToggle}
                  closeditems={closeditems}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AccordionWithDND;
