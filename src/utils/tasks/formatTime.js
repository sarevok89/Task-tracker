const formatTime = (time = 0) => {
  return new Date(time).toISOString().slice(11, 19);
};

export default formatTime;
