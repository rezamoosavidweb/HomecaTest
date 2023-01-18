import Image from 'next/image';
import React, { FC, memo, ReactNode, useState } from 'react';
import { IconType } from 'react-icons';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface IProps {
    extraClass?: string;
    children: ReactNode;
    Icon?: IconType;
    imageSrc?: string;
    title: string;
    selectedContent?: string;
    titleClass?: string;
    arrowClass?: string;
    childrenClass?: string;
    description?: string;
    descriptionClass?: string;
}

const Accordion: FC<IProps> = ({
    children,
    title,
    imageSrc,
    extraClass,
    Icon,
    descriptionClass,
    description,
    selectedContent,
    titleClass,
    arrowClass,
    childrenClass,
}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <div className={`${extraClass}`}>
            <div
                className='flex cursor-pointer items-center justify-between'
                onClick={handleOpen}
            >
                <div className='flex items-center'>
                    {imageSrc && (
                        <Image src={imageSrc} width={25} height={30} alt='' />
                    )}
                    {Icon && <Icon size='22' />}
                    <span className={titleClass}>
                        {title}
                        <span className={descriptionClass}>{description}</span>
                    </span>
                </div>

                <span className={arrowClass}>
                    {selectedContent ? (
                        selectedContent
                    ) : open ? (
                        <BiChevronUp size={20} />
                    ) : (
                        <BiChevronDown size={20} />
                    )}
                </span>
            </div>

            {open && <div className={childrenClass}>{children}</div>}
        </div>
    );
};

export default memo(Accordion);
