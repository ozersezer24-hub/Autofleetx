export default function Home() {
  return (
    <div style={{padding: 40}}>
      <h1>🚗 AutoFleetX</h1>
      <p>Hoş geldiniz! Bu platform ile araçlarınızı sanal garajınızda yönetebilirsiniz.</p>
      <ul>
        <li><a href="/listings">İlanları Görüntüle</a></li>
        <li><a href="/add">Yeni İlan Ekle</a></li>
        <li><a href="/billing">Fatura Bilgilerim</a></li>
      </ul>
    </div>
  )
}
