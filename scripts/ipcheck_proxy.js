let url = "https://api.ip.sb/geoip";

$httpClient.get(url, function(error, response, data) {
  if (error) {
    body = {
      title: "Tunnel info",
      content: "Can't get IP info",
      icon: "exclamationmark.triangle.fill",
      backgroundColor: '#FF9500'
    };
    $done(body);
    return;
  }

  let jsonData = JSON.parse(data);

  let country = jsonData.country || "Unknown Country";
  let countryCode = jsonData.country_code || "";
  let emoji = getFlagEmoji(countryCode);
  let city = jsonData.city || jsonData.region || "Unknown City";
  let isp = jsonData.organization || "Unknown ISP";
  let ip = jsonData.ip || "Unknown IP";

  body = {
    title: "Your VPN",
    content: `${ip}\n${isp}\n${emoji}${country} - ${city}`,
    icon: "network.badge.shield.half.filled",
    backgroundColor: '#0C9DFA'
  };

  $done(body);
});

function getFlagEmoji(countryCode) {
  if (!countryCode) return "";
  if (countryCode.toUpperCase() === 'TW') {
    countryCode = 'CN';
  }
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
