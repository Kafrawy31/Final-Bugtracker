// "use client";
// import React, { useContext } from "react";
// import { Container } from "react-bootstrap/";
// import { Nav } from "react-bootstrap/";
// import { Navbar } from "react-bootstrap/";
// import { NavDropdown } from "react-bootstrap/";
// import AuthContext from "../context/AuthContext.js";
// import Link from "next/link";
// import ProjectContext from "../context/ProjectContext.js";

// function Header({ Role }) {
//   let { user, userLogout } = useContext(AuthContext);
//   let { handleCurrId } = useContext(ProjectContext);
//   return (
//     <Navbar className="Header" bg="dark" expand="lg" variant="dark">
//       <Container>
//         <Navbar.Brand href="#home">Bug Tracker</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             {user ? (
//               <Nav.Link href="/homepage">Home</Nav.Link>
//             ) : (
//               <Nav.Link href="/">Register</Nav.Link>
//             )}
//             {user ? (
//               <Nav.Link to="/Login" onClick={userLogout}>
//                 Logout
//               </Nav.Link>
//             ) : (
//               <Nav.Link href="/Login">Login</Nav.Link>
//             )}
//             {user ? (
//               <NavDropdown title="More" id="basic-nav-dropdown">
//                 <NavDropdown.Item as={Link} to="/SubmitTicket">
//                   Submit Ticket
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/account"
//                   onClick={() => handleCurrId(user.user_id)}
//                 >
//                   Account
//                 </NavDropdown.Item>
//                 {(Role === "Admin" || Role === "Senior") && (
//                   <>
//                     <NavDropdown.Item as={Link} to="/CreateProject">
//                       Create Project
//                     </NavDropdown.Item>
//                     <NavDropdown.Divider />
//                   </>
//                 )}
//               </NavDropdown>
//             ) : null}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;
