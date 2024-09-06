const getFormattedDate = (created_on) => {
    const postDate = new Date(created_on);
    const now = new Date();
    const timeDiff = now - postDate;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      if (hours >= 1) {
        return `${hours}h ago`;
      } else if (minutes >= 1) {
        return `${minutes}m ago`;
      } else {
        return `${seconds}s ago`;
      }
    } else {
      return postDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    }
  };
  export default getFormattedDate