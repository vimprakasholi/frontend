const Card = ({ label, value, icon }) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700 min-h-24 flex gap-3 flex-col items-start justify-center">
      <div className="flex gap-3 items-center">
        {icon}
        <h3 className="text-gray-700 dark:text-gray-200">{label}</h3>
      </div>
      <div className="text-3xl font-semibold text-gray-700 dark:text-gray-200">{value}</div>
    </div>
  );
};

export default Card;
