import './Footer.css';
import github from '../assets/github.svg';
import heart from '../assets/heart.svg';

function Footer() {
  return (
    <footer className="footer">
      <div>
        <span>
          Made with <img src={heart} alt="heart"></img> by {" "}
          <a
            href={`https://github.com/szmazhr`}
            target="_blank"
            rel="noreferrer"
          >
            Shahzar Mazhar
          </a>
        </span>
      </div>
      <div className="repo_link">
        <a href='https://github.com/szmazhr/shopping-cart' target="_blank" rel="noreferrer">
          <img src={github} alt="github" width={30} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;