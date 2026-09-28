import { ArrowRight, PackagePlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WelcomeBanner({ name }: { name: string }) {
  return (
    <section className="welcome-banner">
      <div className="welcome-copy">
        <span className="eyebrow">DONATE • MATCH • DELIVER • MEASURE</span>
        <h1>Welcome back, {name.split(' ')[0]} <span className="wave">👋</span></h1>
        <p>Your surplus food can make a real difference. Let's feed communities together.</p>
        <div className="welcome-actions">
          <Link to="/donor/donations/new" className="primary-button"><PackagePlus size={18} /> Donate Food</Link>
          <Link to="/donor/donations" className="soft-button">View my donations <ArrowRight size={17} /></Link>
        </div>
      </div>
      <div className="food-illustration" aria-hidden="true">
        <div className="sun-circle" />
        <div className="leaf leaf-a">🌿</div>
        <div className="leaf leaf-b">🌱</div>
        <div className="crate">
          <div className="food food-apple">🍎</div>
          <div className="food food-carrot">🥕</div>
          <div className="food food-tomato">🍅</div>
          <div className="food food-lettuce">🥬</div>
          <div className="crate-label">FoodBridge</div>
        </div>
        <div className="illustration-message">Good food<br /><span>brighter tomorrow</span> 💚</div>
      </div>
    </section>
  );
}
