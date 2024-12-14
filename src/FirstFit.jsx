import { useState } from "react";

const FirstFitAllocator = () => {
  const [numBlocks, setNumBlocks] = useState(0);
  const [numProcesses, setNumProcesses] = useState(0);
  const [memoryBlocks, setMemoryBlocks] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [allocation, setAllocation] = useState([]);

  const handleBlockChange = (index, value) => {
    const updatedBlocks = [...memoryBlocks];
    updatedBlocks[index] = parseInt(value) || "";
    setMemoryBlocks(updatedBlocks);
  };

  const handleProcessChange = (index, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index] = parseInt(value) || "";
    setProcesses(updatedProcesses);
  };

  const handleAllocate = () => {
    const updatedAllocation = Array(numProcesses).fill(-1);
    const availableBlocks = [...memoryBlocks];

    processes.forEach((processSize, processIndex) => {
      for (
        let blockIndex = 0;
        blockIndex < availableBlocks.length;
        blockIndex++
      ) {
        if (availableBlocks[blockIndex] >= processSize) {
          updatedAllocation[processIndex] = blockIndex;
          availableBlocks[blockIndex] -= processSize;
          break;
        }
      }
    });

    setAllocation(updatedAllocation);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 p-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          First Fit Memory Allocation
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Block Details */}
          <div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Number of Memory Blocks:
              </label>
              <input
                type="number"
                value={numBlocks || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setNumBlocks(value);
                  setMemoryBlocks(Array(value).fill(0));
                }}
                className="w-full p-2 border rounded-lg text-lg"
              />
            </div>

            {memoryBlocks.map((block, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Size of Block {index + 1}:
                </label>
                <input
                  type="number"
                  value={block || ""}
                  onChange={(e) => handleBlockChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg text-lg"
                />
              </div>
            ))}
          </div>

          {/* Right Side: Process Details */}
          <div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Number of Processes:
              </label>
              <input
                type="number"
                value={numProcesses || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setNumProcesses(value);
                  setProcesses(Array(value).fill(0));
                }}
                className="w-full p-2 border rounded-lg text-lg"
              />
            </div>

            {processes.map((process, index) => (
              <div key={index} className="mb-4">
                <label className="block text-lg font-semibold mb-2">
                  Size of Process {index + 1}:
                </label>
                <input
                  type="number"
                  value={process || ""}
                  onChange={(e) => handleProcessChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg text-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAllocate}
          className="w-full p-3 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Allocate
        </button>

        {allocation.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Allocation Results:</h2>
            <ul className="space-y-2">
              {processes.map((process, index) => (
                <li key={index} className="text-lg">
                  Process {index + 1} of size {process} is{" "}
                  {allocation[index] !== -1
                    ? `allocated to Block ${allocation[index] + 1}`
                    : "not allocated"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstFitAllocator;
