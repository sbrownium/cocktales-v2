import Button from "./Button";
import XIcon from "./XIcon";
import Delete from "./Delete";
import Archive from "./Archive";
import "./../styles/Modal";

export default function Modal ({
    reference,
    path,
    nodeID,
    handleModalToggle,
    toggleExpand,
    type,
    action,
    thisOne,
    archived
}) {
    
    return (
        <dialog ref={reference} className='overlay'>
            <div className='buttonHolder'>
                <Button className='modalBtn' handleClick={handleModalToggle}>
                    <XIcon
                    height='1.25em'
                    fillColor='rgba(255, 255, 255, 0.6)'
                    />
                </Button>
            </div>
            <p>Are you sure you want to {action()} {(type === 'comment') ? 'your' : 'the'} {type}?</p>
            <div className="actionBtnHolder">
                {(action() === 'delete') &&
                <Delete
                    path={path}
                    nodeID={nodeID}
                    className='color-1'
                    handleModalToggle={handleModalToggle}
                    toggleExpand={toggleExpand}
                />}
                  {((action() === 'archive') || (action() === 'unarchive')) &&
                <Archive
                    path={path}
                    nodeID={nodeID}
                    className='color-1'
                    handleModalToggle={handleModalToggle}
                    toggleExpand={toggleExpand}
                    // categoryObject={categoryObject}
                    thisOne={thisOne}
                    type={type}
                    archived={archived}
                />}
                <Button className='actionBtn color-4' handleClick={handleModalToggle}>
                    Never Mind
                </Button>
            </div>
        </dialog>
    )
}