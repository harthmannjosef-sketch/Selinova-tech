export default function Footer() {
  return (
    <>
      <footer className="nm-footer">
        <div className="nm-foot-col">
          <img src="/images/selinova-gate-logo.png" alt="SELINOVA-TECH" style={{ height: '28px', width: 'auto', marginBottom: '8px' }} />
          <a href="#">Über uns</a>
          <a href="#">Wie es funktioniert</a>
          <a href="#">Preise</a>
          <a href="#">Blog</a>
        </div>
        <div className="nm-foot-col">
          <h4>Marktplatz</h4>
          <a href="#">Webseiten kaufen</a>
          <a href="#">Webseiten mieten</a>
          <a href="#">Angebot einstellen</a>
          <a href="#">Bewertungen</a>
        </div>
        <div className="nm-foot-col">
          <h4>Rechtliches</h4>
          <a href="#">Kaufverträge (PDF)</a>
          <a href="#">Mietverträge (PDF)</a>
          <a href="#">Datenschutz</a>
          <a href="#">AGB</a>
        </div>
        <div className="nm-foot-col">
          <h4>Kontakt</h4>
          <a href="mailto:support@selinova-tech.at">support@selinova-tech.at</a>
          <a href="tel:+4312125867344">+43 1 212 58 67 344</a>
          <a href="#">Engerthstrasse 1020 Wien</a>
        </div>
      </footer>
      <div className="nm-foot-bottom">
        © 2026 SELINOVA-TECH Medien Architektur E.U · Wien, Österreich · ALLE ANGEBOTE GEPRÜFT · GDPR KONFORM · IMPRESSUM
      </div>
    </>
  );
}
