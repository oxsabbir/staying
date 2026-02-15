export default function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted">
      <div className="container grid gap-5 md:grid-cols-3 lg:grid-cols-5">
        <div>
          <h4 className="mb-2 font-semibold text-text">Support</h4>
          <a className="mb-2 block" href="#">
            Coronavirus (COVID-19) FAQs
          </a>
          <a className="mb-2 block" href="#">
            Manage your trips
          </a>
          <a className="mb-2 block" href="#">
            Contact Customer Service
          </a>
          <a className="mb-2 block" href="#">
            Safety Resource Center
          </a>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-text">Discover</h4>
          <a className="mb-2 block" href="#">
            Genius loyalty program
          </a>
          <a className="mb-2 block" href="#">
            Seasonal and holiday deals
          </a>
          <a className="mb-2 block" href="#">
            Travel articles
          </a>
          <a className="mb-2 block" href="#">
            Booking.com for Business
          </a>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-text">Terms and settings</h4>
          <a className="mb-2 block" href="#">
            Privacy & cookies
          </a>
          <a className="mb-2 block" href="#">
            Terms and conditions
          </a>
          <a className="mb-2 block" href="#">
            Partner dispute
          </a>
          <a className="mb-2 block" href="#">
            Modern Slavery Statement
          </a>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-text">Partners</h4>
          <a className="mb-2 block" href="#">
            Extranet login
          </a>
          <a className="mb-2 block" href="#">
            Partner help
          </a>
          <a className="mb-2 block" href="#">
            List your property
          </a>
          <a className="mb-2 block" href="#">
            Become an affiliate
          </a>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-text">About</h4>
          <a className="mb-2 block" href="#">
            About Booking.com
          </a>
          <a className="mb-2 block" href="#">
            How we work
          </a>
          <a className="mb-2 block" href="#">
            Sustainability
          </a>
          <a className="mb-2 block" href="#">
            Investor relations
          </a>
        </div>
      </div>
      <div className="container mt-6 flex flex-col gap-2">
        <span>
          Staying.com is part of Staying Holdings Inc., the world leader in
          online travel and related services.
        </span>
        <span>Copyright © 2026 Staying.com</span>
      </div>
    </footer>
  );
}
