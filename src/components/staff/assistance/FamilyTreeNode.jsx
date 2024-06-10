import React, { useState } from 'react';

const FamilyTreeNode = ({ node, userDetails, setShowOtherInfo, setMemberSelected }) => {
    return (
        <div className="w-4/6 p-2 flex flex-col items-center gap-8 tree-node text-sm">
           
            <div className='flex justify-center gap-5 tree-children'>
                {node.map(data => (
                    (data.relationship === 'Grand Mother' || data.relationship === 'Grand Father') &&
                    <p className='p-4 rounded-full bg-slate-200 font-bold shadow-md hover:underline cursor-pointer' onClick={(e) => [setShowOtherInfo(true), setMemberSelected(data)]}>
                        <span className='text-xs font-normal'>{data.relationship}</span>: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}
                    </p>
                ))}
            </div>
            <div className='flex justify-center gap-5'>
                {node.map(data => (
                    (data.relationship === 'Mother' || data.relationship === 'Father') &&
                    <p className='p-4 rounded-full bg-slate-200 font-bold shadow-md hover:underline cursor-pointer' onClick={(e) => [setShowOtherInfo(true), setMemberSelected(data)]}>
                        <span className='font-bold'>{data.relationship}</span>: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}
                    </p>
                ))}
            </div>
            <div className='flex justify-center gap-5 tree-children'>
                {node.map(data => (
                    (data.relationship === 'Brother' || data.relationship === 'Sister') &&
                    <p className='p-4 rounded-full bg-slate-200 font-bold shadow-md hover:underline cursor-pointer' onClick={(e) => [setShowOtherInfo(true), setMemberSelected(data)]}>
                        <span className='font-bold'>{data.relationship}</span>: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}
                    </p>
                ))}
            </div>
            <div className='flex justify-center gap-5 tree-children'>
                {node.map(data => (
                    (data.relationship === 'Son' || data.relationship === 'Daughter') &&
                    <p className='p-4 rounded-full bg-slate-200 font-bold shadow-md hover:underline cursor-pointer' onClick={(e) => [setShowOtherInfo(true), setMemberSelected(data)]}>
                        <span className='font-bold'>{data.relationship}</span>: {data.first_name + ' ' + data.middle_name + ' ' + data.last_name}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default FamilyTreeNode;
