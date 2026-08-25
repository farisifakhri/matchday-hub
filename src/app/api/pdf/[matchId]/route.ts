import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  // Generate high-fidelity HTML-based Official Match Sheet (BAP) that is 100% print/PDF ready
  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Berita Acara Pertandingan - MatchDay Hub</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #1e293b; font-size: 11px; margin: 0; padding: 20px; line-height: 1.4; }
    .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 16px; }
    .title { font-size: 16px; font-weight: bold; text-transform: uppercase; margin: 0; }
    .subtitle { font-size: 11px; color: #475569; margin: 4px 0 0 0; }
    .meta-row { display: flex; justify-content: space-between; margin-top: 8px; font-size: 10px; color: #334155; }
    
    .score-card { display: flex; justify-content: space-around; align-items: center; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 20px; }
    .team-box { text-align: center; width: 40%; }
    .team-name { font-size: 14px; font-weight: bold; }
    .score-digit { font-size: 28px; font-weight: 900; color: #0f172a; padding: 0 16px; }
    
    .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; margin: 16px 0 6px 0; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    
    table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; font-size: 10px; }
    th { background: #e2e8f0; font-weight: bold; text-align: left; }
    .text-center { text-align: center; }
    
    .signatures { display: flex; justify-content: space-between; margin-top: 40px; }
    .sign-box { width: 30%; text-align: center; }
    .sign-line { border-top: 1px solid #0f172a; margin-top: 50px; font-weight: bold; padding-top: 4px; }
    
    .print-btn { background: #0f172a; color: #fff; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; margin-bottom: 16px; }
    @media print { .print-btn { display: none; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Cetak / Simpan sebagai PDF (A4)</button>

  <div class="header">
    <div class="title">SUPER LEAGUE CHAMPIONSHIP FUTSAL 2026</div>
    <div class="subtitle">BERITA ACARA PERTANDINGAN (OFFICIAL MATCH SHEET)</div>
    <div class="meta-row">
      <span><strong>Match ID:</strong> #001 (Group Stage)</span>
      <span><strong>Venue:</strong> GOR Sumantri Brodjonegoro (Court 1)</span>
      <span><strong>Tanggal:</strong> ${new Date().toLocaleDateString("id-ID", { dateStyle: "full" })}</span>
    </div>
  </div>

  <div class="score-card">
    <div class="team-box">
      <div class="team-name">GARUDA MUDA FC</div>
      <small style="color: #64748b;">(Home Team)</small>
    </div>
    <div class="score-digit">1 - 0</div>
    <div class="team-box">
      <div class="team-name">RAJAWALI FUTSAL CLUB</div>
      <small style="color: #64748b;">(Away Team)</small>
    </div>
  </div>

  <div class="section-title">1. Ringkasan Pelanggaran & Time-out (Fouls & Timeouts)</div>
  <table>
    <thead>
      <tr>
        <th>Kategori</th>
        <th class="text-center">Garuda Muda FC</th>
        <th class="text-center">Rajawali Futsal Club</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Akumulasi Pelanggaran Babak 1 (Fouls 1H)</td>
        <td class="text-center">2</td>
        <td class="text-center">3</td>
      </tr>
      <tr>
        <td>Akumulasi Pelanggaran Babak 2 (Fouls 2H)</td>
        <td class="text-center">0</td>
        <td class="text-center">0</td>
      </tr>
      <tr>
        <td>Time-out Babak 1 (1H)</td>
        <td class="text-center">0 / 1</td>
        <td class="text-center">0 / 1</td>
      </tr>
      <tr>
        <td>Time-out Babak 2 (2H)</td>
        <td class="text-center">0 / 1</td>
        <td class="text-center">0 / 1</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">2. Kejadian Penting / Gol / Kartu (Match Incidents Log)</div>
  <table>
    <thead>
      <tr>
        <th style="width: 12%;">Waktu</th>
        <th style="width: 10%;">Babak</th>
        <th style="width: 25%;">Pemain</th>
        <th style="width: 18%;">Klub</th>
        <th style="width: 35%;">Uraian Kejadian</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>00:00</td>
        <td>1H</td>
        <td>-</td>
        <td>-</td>
        <td>Kick-off babak pertama resmi dimulai</td>
      </tr>
      <tr>
        <td>04:32</td>
        <td>1H</td>
        <td>#7 Fajar Pratama</td>
        <td>Garuda Muda FC</td>
        <td><strong>GOL!</strong> Tendangan mendatar kaki kanan</td>
      </tr>
      <tr>
        <td>07:10</td>
        <td>1H</td>
        <td>#5 Eko Prasetyo</td>
        <td>Rajawali FC</td>
        <td>Pelanggaran langsung (*Direct Foul*)</td>
      </tr>
      <tr>
        <td>09:45</td>
        <td>1H</td>
        <td>#10 Syahrul Ramadhan</td>
        <td>Garuda Muda FC</td>
        <td><strong>KARTU KUNING</strong> (Pelanggaran taktis)</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">3. Pengesahan Perangkat Pertandingan (Match Officials Signatures)</div>
  <div class="signatures">
    <div class="sign-box">
      <small>Wasit 1 (First Referee)</small>
      <div class="sign-line">Agus Hendrawan, S.Pd<br><span style="font-size: 9px; font-weight: normal; color: #64748b;">(Lic: Level 1 Nasional)</span></div>
    </div>
    <div class="sign-box">
      <small>Wasit 2 (Second Referee)</small>
      <div class="sign-line">Deni Hermawan<br><span style="font-size: 9px; font-weight: normal; color: #64748b;">(Lic: Level 2 Daerah)</span></div>
    </div>
    <div class="sign-box">
      <small>Pencatat Waktu (Timekeeper)</small>
      <div class="sign-line">Rian Prasetyo<br><span style="font-size: 9px; font-weight: normal; color: #64748b;">(Lic: Level 3 Daerah)</span></div>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(htmlContent, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
