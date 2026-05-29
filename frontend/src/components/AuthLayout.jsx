const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="brand-mark">M</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
