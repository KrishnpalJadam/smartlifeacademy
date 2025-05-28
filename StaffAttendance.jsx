import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaFileCsv, FaPrint, FaCheck, FaTrash } from 'react-icons/fa';
import './StaffAttendance.css';

const StaffAttendance = () => {
  const [collapse, setCollapse] = useState({});

  const toggleCollapse = (id) => {
    setCollapse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="staff-container my-4 px-3">
      <h4 className="staff-title">Staff Attendance</h4>

      <div className="staff-filter-box">
        <div className="row align-items-end gy-2">
          <div className="col-md-3">
            <label className="staff-label">Date Period</label>
            <div className="d-flex gap-2">
              <input type="date" className="form-control" defaultValue="2025-04-20" />
              <span className="staff-to-label">to</span>
              <input type="date" className="form-control" defaultValue="2025-05-01" />
            </div>
          </div>
          <div className="col-md-3">
            <label className="staff-label">Club</label>
            <select className="form-control">
              <option>Golf Simulator</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="staff-label">Staff</label>
            <select className="form-control">
              <option>All Staff</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-center gap-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="decimalTime" />
              <label className="form-check-label" htmlFor="decimalTime">Time Worked as Decimal</label>
            </div>
            <button className="btn btn-outline-secondary btn-sm">
              <FaFileCsv /> CSV (.csv)
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <FaPrint /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered staff-table">
          <thead className="table-light">
            <tr>
              <th>Staff</th>
              <th>When</th>
              <th>Clocked In</th>
              <th>Clocked Out</th>
              <th>Time Worked</th>
              <th>Appointments</th>
              <th>Classes Taken</th>
              <th>Members Signed Up</th>
              <th>Available/Roster Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aira Fitness Foxlake Staff</td>
              <td>Apr 24, 2025</td>
              <td>-</td>
              <td>-</td>
              <td>0 hrs</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0 hrs / 24 hrs</td>
              <td>
                <span
                  className={`staff-collapse-icon ${collapse[1] ? 'rotate' : ''}`}
                  onClick={() => toggleCollapse(1)}
                >
                  {collapse[1] ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </td>
            </tr>
            {collapse[1] && (
              <tr className="staff-timesheet-row">
                <td colSpan="10">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="mb-2">Didn't check in</div>
                    <div>
                      <button className="staff-mark-absence me-2">Mark Absence</button>
                      <button className="staff-add-timesheet" onClick={() => toggleCollapse('form1')}>+ Add Timesheet</button>
                    </div>
                  </div>
                  {collapse['form1'] && (
                    <div className="mt-3">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td><input type="time" className="form-control" /></td>
                            <td><input type="time" className="form-control" /></td>
                            <td><textarea rows="1" className="form-control" placeholder="Notes"></textarea></td>
                            <td>
                              <button className="staff-save-btn me-2"><FaCheck /></button>
                              <button className="staff-delete-btn"><FaTrash /></button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAttendance;
