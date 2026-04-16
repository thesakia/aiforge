/// <reference path="../pb_data/types.d.ts" />

// ─── Hook : envoi du code d'accès après inscription ──────────────────────────
// Se déclenche après la création d'un record dans prospect_forge.
// Appel HTTP vers le service mailer sur l'hôte (port 8091).

onRecordCreate((e) => {
    e.next();

    const record = e.record;
    const email  = record.get("email");

    if (!email) return;

    try {
        const res = $http.send({
            url:    "http://172.18.0.1:8091/send?email=" + encodeURIComponent(email),
            method: "POST",
        });
        console.log("Email AI FORGE envoyé à:", email, "| status:", res.statusCode);
    } catch(err) {
        console.error("Erreur envoi email AI FORGE:", String(err));
    }

}, "prospect_forge");
