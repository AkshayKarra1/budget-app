import Link from "next/link";
import * as styles from "./Navbar.module.css";
const Navbar = (props) => {
  return (
    <>
      <nav className={styles.mainnav}>
        <ul>
          <Link
            href="/dashboard"
            className={`${
              props.activeTab == "dashboard" ? styles.activeItem : styles.item
            }`}
          >
            <li>Dashboard</li>
          </Link>
          <Link
            href="/budgets"
            className={`${
              props.activeTab == "budgets" ? styles.activeItem : styles.item
            }`}
          >
            <li>Budgets</li>
          </Link>
          <Link
            href="/expense"
            className={`${
              props.activeTab == "expense" ? styles.activeItem : styles.item
            }`}
          >
            <li>Expense</li>
          </Link>
          <Link
            href="/login"
            className={`${
              props.activeTab == "logout" ? styles.activeItem : styles.item
            }`}
          >
            <li>Logout</li>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
