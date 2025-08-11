import React, { useState, useMemo, useEffect } from "react";

const leads = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    profession: "Engineer",
    course: "Computer Science",
    persona: "Buyer",
    status: "Active",
    demoDate: "2025-08-15",
    source: "Website",
    brochure: "Yes",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "234-567-8901",
    location: "San Francisco",
    profession: "Designer",
    course: "Graphic Design",
    persona: "Researcher",
    status: "Pending",
    demoDate: "2025-08-20",
    source: "Referral",
    brochure: "No",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "345-678-9012",
    location: "Chicago",
    profession: "Manager",
    course: "Business",
    persona: "Decision Maker",
    status: "Lost",
    demoDate: "2025-08-18",
    source: "Email Campaign",
    brochure: "Yes",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "456-789-0123",
    location: "Seattle",
    profession: "Consultant",
    course: "Marketing",
    persona: "Buyer",
    status: "Active",
    demoDate: "2025-08-22",
    source: "Website",
    brochure: "Yes",
  },
  {
    id: 5,
    name: "Bob Martin",
    email: "bob@example.com",
    phone: "567-890-1234",
    location: "Austin",
    profession: "Developer",
    course: "Software Engineering",
    persona: "Researcher",
    status: "Pending",
    demoDate: "2025-08-25",
    source: "Social Media",
    brochure: "No",
  },
  {
    id: 6,
    name: "Charlie Lee",
    email: "charlie@example.com",
    phone: "678-901-2345",
    location: "Boston",
    profession: "Analyst",
    course: "Data Science",
    persona: "Buyer",
    status: "Active",
    demoDate: "2025-08-30",
    source: "Referral",
    brochure: "Yes",
  },
];

const ROWS_PER_PAGE = 3;

type SortColumn = "name" | "demoDate" | null;
type SortDirection = "asc" | "desc";

export default function LeadsTable() {
  const [filters, setFilters] = useState({
    name: "All",
    email: "All",
  });

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const getUnique = (key: keyof typeof leads[0]) => {
    const values = leads.map((l) => l[key]);
    return ["All", ...Array.from(new Set(values))];
  };

  const uniqueNames = useMemo(() => getUnique("name"), []);
  const uniqueEmails = useMemo(() => getUnique("email"), []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (filters.name !== "All" && lead.name !== filters.name) return false;
      if (filters.email !== "All" && lead.email !== filters.email) return false;
      return true;
    });
  }, [filters]);

  const sortedLeads = useMemo(() => {
    if (!sortBy) return filteredLeads;
    return [...filteredLeads].sort((a, b) => {
      let compare = 0;
      if (sortBy === "name") {
        compare = a.name.localeCompare(b.name);
      } else if (sortBy === "demoDate") {
        compare =
          new Date(a.demoDate).getTime() - new Date(b.demoDate).getTime();
      }
      return sortDirection === "asc" ? compare : -compare;
    });
  }, [filteredLeads, sortBy, sortDirection]);

  const totalPages = Math.ceil(sortedLeads.length / ROWS_PER_PAGE);

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedLeads.slice(start, start + ROWS_PER_PAGE);
  }, [sortedLeads, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* HEADER */}
      <header className="w-full max-w-7xl bg-black text-white py-6 px-8 mb-8 flex justify-center">
        <h1 className="text-4xl font-extrabold tracking-wide">Firebird VR</h1>
      </header>

      {/* FILTERS */}
      <div className="w-full max-w-7xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-0">
        <select
          className="border rounded px-3 py-2 w-full"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        >
          {uniqueNames.map((n) => (
            <option key={n} value={n}>
              {n === "All" ? "All Names" : n}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2 w-full"
          value={filters.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
        >
          {uniqueEmails.map((eVal) => (
            <option key={eVal} value={eVal}>
              {eVal === "All" ? "All Emails" : eVal}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-3xl font-bold text-gray-800 p-6 border-b border-gray-200">
          Leads Table
        </h2>
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 cursor-pointer select-none">
            <tr>
              <th
                className="border border-gray-300 px-4 py-2 text-left"
                onClick={() => handleSort("name")}
              >
                Name {sortBy === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Profession</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Persona</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th
                className="border border-gray-300 px-4 py-2 text-left"
                onClick={() => handleSort("demoDate")}
              >
                Demo Date{" "}
                {sortBy === "demoDate" &&
                  (sortDirection === "asc" ? "▲" : "▼")}
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Source</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Brochure</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="text-center py-6 text-gray-500"
                >
                  No leads found.
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{lead.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.profession}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.course}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.persona}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.status}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.demoDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.source}</td>
                  <td className="border border-gray-300 px-4 py-2">{lead.brochure}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-t border-gray-300">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
