export const getServerTime = async () => {
  const response = await fetch('/api/serverTime');
  const data = await response.json();
  localStorage.setItem('nowTime', data.serverTime);
};
