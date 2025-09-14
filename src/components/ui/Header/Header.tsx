import logo from '../../../assets/images/logo-white.svg';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header>
      <img src={logo as unknown as string} className={styles.logo} alt="BrightHR logo" />
    </header>
  );
}
