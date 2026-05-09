// filepath: frontend/auth-frontend/src/App.jsx
import './App.css'

function App() {
  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="navbar">
          <div className="logo">AuthApp</div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="login-btn">Login</button>
          </div>
        </nav>
      </header>

      <main className="home-content">
        <section className="hero-section">
          <h1>Welcome to AuthApp</h1>
          <p>Secure authentication for your applications</p>
          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <h3>🔐 Secure</h3>
            <p>Industry-standard security for your data</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast</h3>
            <p>Lightning quick authentication</p>
          </div>
          <div className="feature-card">
            <h3>📱 Easy</h3>
            <p>Simple integration with your app</p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2026 AuthApp. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
