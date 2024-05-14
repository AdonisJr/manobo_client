import React from 'react'

export default function Print({ datas }) {
    const renderTableData = () => {
        return datas.map((data, index) => {
            return (
                <tr key={index}>
                    {Object.keys(data).map((key) => (
                        <React.Fragment key={key}>
                            <td>{key}</td>
                            <td>{data[key]}</td>
                        </React.Fragment>
                    ))}
                </tr>
            );
        });
    };

    const handlePrint = () =>{
        window.print();
    }
    return (
        <div className='w-full p-5'>
            
        </div>
    )
}
