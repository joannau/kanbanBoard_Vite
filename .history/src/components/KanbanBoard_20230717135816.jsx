import React, {useState,} from "react";
import { css } from "@emotion/react";
import KanbanColumn from "./KanbanColumn";

const kanbanBoardStyles = css`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
`;

const COLUMN_BG_COLORS = {
    loading: "#E3E3E3",
    todo: "#C9AF97",
    ongoing: "#FFE799",
    done: "#C0E8BA",
};

export const COLUMN_KEY_TODO = "todo";
export const COLUMN_KEY_ONGOING = "ongoing";
export const COLUMN_KEY_DONE = "done";

export default function KanbanBoard({
    isLoading = true,
    todoList,
    ongoingList,
    doneList,
    onAdd,
    onRemove,
}) {
    const [draggedItem, setDraggedItem] = useState(null);
    const [draggedSource, setDraggedSource] = useState(null);
    const [draggedTarget, setDraggedTarget] = useState(null);

    const handleDrop = (evt) => {
        if (
            !draggedItem ||
            !draggedSource ||
            !draggedTarget ||
            draggedSource === draggedTarget
        ) {
            return;
        }

        draggedSource && onRemove(draggedSource, draggedItem);
        draggedTarget && onAdd(draggedTarget, draggedItem);
    };

    return (
        <main css={kanbanBoardStyles}>
            {isLoading ? (
                <KanbanColumn title="读取中……" bgColor={COLUMN_BG_COLORS.loading} />
            ) : (
                <>
                    <KanbanColumn
                        bgColor={COLUMN_BG_COLORS.todo}
                        title="待处理"
                        cardList={todoList}
                        setDraggedItem={setDraggedItem}
                        setIsDragSource={(isSrc) =>
                            setDraggedSource(isSrc ? COLUMN_KEY_TODO : null)
                        }
                        setIsDragTarget={(isTgt) =>
                            setDraggedTarget(isTgt ? COLUMN_KEY_TODO : null)
                        }
                        onDrop={handleDrop}
                        canAddNew
                        onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
                        onRemove={onRemove.bind(null, COLUMN_KEY_TODO)}
                    />
                    <KanbanColumn
                        bgColor={COLUMN_BG_COLORS.ongoing}
                        title="进行中"
                        cardList={ongoingList}
                        setDraggedItem={setDraggedItem}
                        setIsDragSource={(isSrc) =>
                            setDraggedSource(isSrc ? COLUMN_KEY_ONGOING : null)
                        }
                        setIsDragTarget={(isTgt) =>
                            setDraggedTarget(isTgt ? COLUMN_KEY_ONGOING : null)
                        }
                        onDrop={handleDrop}
                        onRemove={onRemove.bind(null, COLUMN_KEY_ONGOING)}
                    />
                    <KanbanColumn
                        bgColor={COLUMN_BG_COLORS.done}
                        title="已完成"
                        cardList={doneList}
                        setDraggedItem={setDraggedItem}
                        setIsDragSource={(isSrc) =>
                            setDraggedSource(isSrc ? COLUMN_KEY_DONE : null)
                        }
                        setIsDragTarget={(isTgt) =>
                            setDraggedTarget(isTgt ? COLUMN_KEY_DONE : null)
                        }
                        onDrop={handleDrop}
                        onRemove={onRemove.bind(null, COLUMN_KEY_DONE)}
                    />
                </>
            )}
        </main>
    );
}
