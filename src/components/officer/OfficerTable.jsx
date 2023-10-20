import React from 'react'

export default function OfficerTable({officerList, setSelectedOfficer, handleModal}) {
  return (
    <table className="table table-auto w-full text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2">I.D</th>
          <th className="p-2">First Name</th>
          <th className="p-2">Last Name</th>
          <th className="p-2">email</th>
          <th className="p-2">Rank</th>
          <th className="p-2">Role</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {officerList.map((person) => (
          <tr key={person.id} className="text-center bg-slate-50">
            <td className="p-4">{person.id}</td>
            <td>{person.first_name}</td>
            <td>{person.last_name}</td>
            <td>{person.email}</td>
            <td>{person.ranks}</td>
            <td>{person.role}</td>
            <td className="flex gap-2 justify-center items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill text-emerald-500 cursor-pointer"
                viewBox="0 0 16 16"
                onClick={() => {setSelectedOfficer(person); handleModal(true)}}
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash2-fill text-red-500 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
