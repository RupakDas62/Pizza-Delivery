const OrderStatusTracker = ({ status }) => {
  const stages = ['Pending', 'Received', 'In Kitchen', 'Sent to Delivery'];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {stages.map((stage) => (
        <div
          key={stage}
          className={`px-4 py-1 rounded-full text-sm font-medium border ${
            stage === status
              ? 'bg-green-500 text-white border-green-600'
              : 'bg-gray-100 text-gray-700 border-gray-300'
          }`}
        >
          {stage}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusTracker;
