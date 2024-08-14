import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import Link from "next/link.js";
import moment from "moment";
import ProjectContext from "../context/ProjectContext.js";

export default function TicketTable({
  tickets,
  search = "",
  ticketTerenary = true,
  userRole,
}) {
  let { handleFetchTicketEdit, handleFetchTicket } = useContext(ProjectContext);

  const getStatusClass = (status) => {
    switch (status) {
      case "Closed":
        return "status-closed";
      case "Pending":
        return "status-pending";
      case "Open":
        return "status-open";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "Very High":
        return "priority-very-high";
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  const mapStatus = (status) => {
    switch (status) {
      case "CL":
        return "Closed";
      case "PE":
        return "Pending";
      case "OP":
        return "Open";
      default:
        return status;
    }
  };

  const mapPriority = (priority) => {
    switch (priority) {
      case "VH":
        return "Very High";
      case "H":
        return "High";
      case "M":
        return "Medium";
      case "L":
        return "Low";
      default:
        return "";
    }
  };

  return (
    <table className="ticket--table  text-xs min-w-[100%] border-b-2 border-l-2 bg-zinc-100 border-r-2 border-black font-thin">
      <thead>
        <tr className="">
          <th className="font-thin">Ticket ID</th>
          <th>Ticket Description</th>
          <th>Ticket Status</th>
          <th>Ticket Priority</th>
          <th>Ticket Points</th>
          <th>Ticket Project</th>
          <th>Submitted by</th>
          <th>Assigned To</th>
          <th>Code Location</th>
          <th>Date Opened</th>
          <th>View/Edit</th>
        </tr>
      </thead>
      <tbody>
        {tickets
          .filter((ticket) => {
            return search === ""
              ? ticket
              : ticket.TicketDescription?.toLowerCase().includes(search) ||
                  ticket.TicketStatus?.toLowerCase().includes(search) ||
                  ticket.TicketPriority?.toLowerCase().includes(search) ||
                  ticket.TicketSubmittedBy?.toLowerCase().includes(search) ||
                  ticket.TicketAssignedTo?.toLowerCase().includes(search) ||
                  ticket.TicketProject?.toLowerCase().includes(search);
          })
          .map((ticket) => {
            return ticketTerenary ? (
              <tr key={ticket.TicketId}>
                <td className="text-center font-bold">{ticket.TicketId}</td>
                <td className="ticket--description">
                  {ticket.TicketDescription}
                </td>

                <td className={getStatusClass(mapStatus(ticket.TicketStatus))}>
                  {mapStatus(ticket.TicketStatus)}
                </td>
                <td>
                  <div className="status--container">
                    <td
                      className={getPriorityClass(
                        mapPriority(ticket.TicketPriority)
                      )}
                      style={{ border: "none" }}
                    >
                      {mapPriority(ticket.TicketPriority)}
                    </td>
                  </div>
                </td>
                <td className="ticket--points font-bold">
                  {ticket.TicketPoints}
                </td>
                <td>{ticket.TicketProject}</td>
                <td>{ticket.TicketSubmittedBy}</td>
                <td>{ticket.TicketAssignedTo}</td>
                <td className="ticket--location">
                  {ticket.TicketCodeLocation}
                </td>
                <td>
                  {moment(ticket.TicketDateOpened).format(
                    "YYYY-MM-DD h:mm:ss a"
                  )}
                </td>
                {userRole === "Senior" || userRole === "Admin" ? (
                  <td className="font-bold italic">
                    <Link
                      onClick={() => handleFetchTicketEdit(ticket.TicketId)}
                      href={`/tickets/${ticket.TicketId}`}
                    >
                      edit
                    </Link>
                  </td>
                ) : (
                  <td className="font-semibold italic">
                    <Link
                      onClick={() => handleFetchTicket(ticket.TicketId)}
                      href={`/view-ticket/${ticket.TicketId}`}
                    >
                      view ticket
                    </Link>
                  </td>
                )}
              </tr>
            ) : null;
          })}
      </tbody>
    </table>
  );
}
