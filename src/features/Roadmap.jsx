import React, { useState } from "react";
import Header from "../components/Header.jsx";

const Roadmap = ({ formData, roadmapData }) => {
  // Dummy roadmap data - used as fallback if API data is not available
  const dummyRoadmapData = {
    cropName: formData?.step1Ip?.cropType || "Tomato",
    plantingDate: formData?.step1Ip?.plantingDate || "2024-03-15",
    harvestDate: "2024-07-15", // Will be calculated by API
    area: formData?.step1Ip?.area || "2.5",
    totalDuration: "120 days",
    currentPhase: "Soil Preparation",
    
    phases: [
      {
        id: 1,
        name: "Land Preparation",
        duration: "7-10 days",
        startDay: 0,
        endDay: 10,
        status: "in-progress", // not-started, in-progress, completed
        tasks: [
          {
            id: 1,
            title: "Clear field of weeds and debris",
            day: "Day 1-2",
            completed: true,
            description: "Remove all weeds, crop residues, and debris from the field"
          },
          {
            id: 2,
            title: "Deep ploughing",
            day: "Day 3-4",
            completed: true,
            description: "Plough the field to 20-25 cm depth to improve soil aeration"
          },
          {
            id: 3,
            title: "Apply organic manure",
            day: "Day 5",
            completed: false,
            description: "Apply 10-15 tons of well-decomposed FYM per acre"
          },
          {
            id: 4,
            title: "Level the field",
            day: "Day 6-7",
            completed: false,
            description: "Level the field properly for uniform water distribution"
          },
          {
            id: 5,
            title: "Prepare beds/ridges",
            day: "Day 8-10",
            completed: false,
            description: "Make raised beds of 15cm height and 60cm width"
          }
        ]
      },
      {
        id: 2,
        name: "Sowing/Transplanting",
        duration: "3-5 days",
        startDay: 11,
        endDay: 15,
        status: "not-started",
        tasks: [
          {
            id: 6,
            title: "Seed treatment",
            day: "Day 11",
            completed: false,
            description: "Treat seeds with Trichoderma @ 4g/kg of seeds"
          },
          {
            id: 7,
            title: "Mark planting spots",
            day: "Day 12",
            completed: false,
            description: "Mark spots at 60cm x 45cm spacing"
          },
          {
            id: 8,
            title: "Transplant seedlings",
            day: "Day 13-15",
            completed: false,
            description: "Transplant 30-35 day old seedlings in the evening"
          },
          {
            id: 9,
            title: "Initial irrigation",
            day: "Day 15",
            completed: false,
            description: "Provide light irrigation immediately after transplanting"
          }
        ]
      },
      {
        id: 3,
        name: "Vegetative Growth",
        duration: "30-40 days",
        startDay: 16,
        endDay: 55,
        status: "not-started",
        tasks: [
          {
            id: 10,
            title: "Gap filling",
            day: "Day 18-20",
            completed: false,
            description: "Replace dead/weak plants with healthy seedlings"
          },
          {
            id: 11,
            title: "First fertilizer application",
            day: "Day 20",
            completed: false,
            description: "Apply 50 kg Urea, 100 kg DAP per acre",
            category: "fertilizer"
          },
          {
            id: 12,
            title: "Weeding - First round",
            day: "Day 25",
            completed: false,
            description: "Remove weeds manually or use recommended herbicides"
          },
          {
            id: 13,
            title: "Irrigation",
            day: "Day 20-55 (Every 5-7 days)",
            completed: false,
            description: "Irrigate at 5-7 day intervals based on soil moisture",
            recurring: true
          },
          {
            id: 14,
            title: "Pest monitoring - Aphids",
            day: "Day 30",
            completed: false,
            description: "Monitor for aphids and whiteflies, spray neem oil if needed",
            category: "pest-control"
          },
          {
            id: 15,
            title: "Second fertilizer application",
            day: "Day 35",
            completed: false,
            description: "Apply 25 kg Urea per acre",
            category: "fertilizer"
          },
          {
            id: 16,
            title: "Weeding - Second round",
            day: "Day 40",
            completed: false,
            description: "Remove weeds and earth up around plants"
          },
          {
            id: 17,
            title: "Staking/Support",
            day: "Day 45",
            completed: false,
            description: "Provide bamboo stakes for plant support"
          }
        ]
      },
      {
        id: 4,
        name: "Flowering & Fruiting",
        duration: "40-50 days",
        startDay: 56,
        endDay: 105,
        status: "not-started",
        tasks: [
          {
            id: 18,
            title: "Third fertilizer application",
            day: "Day 55",
            completed: false,
            description: "Apply 25 kg Urea + 25 kg MOP per acre",
            category: "fertilizer"
          },
          {
            id: 19,
            title: "Pruning side shoots",
            day: "Day 60",
            completed: false,
            description: "Remove excessive side shoots for better fruiting"
          },
          {
            id: 20,
            title: "Irrigation - Critical stage",
            day: "Day 56-105 (Every 4-5 days)",
            completed: false,
            description: "Maintain consistent soil moisture during flowering",
            recurring: true
          },
          {
            id: 21,
            title: "Disease monitoring - Blight",
            day: "Day 65",
            completed: false,
            description: "Check for early/late blight, apply fungicide if needed",
            category: "disease-control"
          },
          {
            id: 22,
            title: "Fourth fertilizer application",
            day: "Day 75",
            completed: false,
            description: "Apply 20 kg Urea per acre",
            category: "fertilizer"
          },
          {
            id: 23,
            title: "Fruit fly management",
            day: "Day 80",
            completed: false,
            description: "Set up pheromone traps and apply recommended insecticides",
            category: "pest-control"
          },
          {
            id: 24,
            title: "Micronutrient spray",
            day: "Day 85",
            completed: false,
            description: "Foliar spray of micronutrients (Zn, B, Fe)",
            category: "fertilizer"
          }
        ]
      },
      {
        id: 5,
        name: "Harvesting",
        duration: "15-20 days",
        startDay: 106,
        endDay: 120,
        status: "not-started",
        tasks: [
          {
            id: 25,
            title: "First harvest",
            day: "Day 106-108",
            completed: false,
            description: "Harvest mature fruits at proper color stage"
          },
          {
            id: 26,
            title: "Subsequent pickings",
            day: "Day 108-120 (Every 3-4 days)",
            completed: false,
            description: "Continue harvesting at 3-4 day intervals",
            recurring: true
          },
          {
            id: 27,
            title: "Grading and sorting",
            day: "Day 106-120",
            completed: false,
            description: "Grade fruits based on size and quality",
            recurring: true
          },
          {
            id: 28,
            title: "Post-harvest handling",
            day: "Day 106-120",
            completed: false,
            description: "Pack in crates, store in cool place, transport to market",
            recurring: true
          }
        ]
      }
    ]
  };

  // Use API-generated roadmap data if available, otherwise use dummy data
  const initialRoadmapData = roadmapData || dummyRoadmapData;
  
  const [currentRoadmapData, setCurrentRoadmapData] = useState(initialRoadmapData);
  const [selectedPhaseId, setSelectedPhaseId] = useState(initialRoadmapData.phases[0].id);
  const [showAllTasks, setShowAllTasks] = useState(false);

  // Always get the selected phase from current roadmap data to keep it in sync
  const selectedPhase = currentRoadmapData.phases.find(phase => phase.id === selectedPhaseId) || currentRoadmapData.phases[0];

  // Dynamically determine the current active phase
  const currentActivePhase = currentRoadmapData.phases.find(phase => phase.status === 'in-progress') 
    || currentRoadmapData.phases.find(phase => phase.status === 'not-started')
    || currentRoadmapData.phases[currentRoadmapData.phases.length - 1];

  // Calculate overall progress
  const totalTasks = currentRoadmapData.phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = currentRoadmapData.phases.reduce(
    (sum, phase) => sum + phase.tasks.filter(task => task.completed).length,
    0
  );
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const handleTaskToggle = (phaseId, taskId) => {
    setCurrentRoadmapData(prev => {
      const updatedPhases = prev.phases.map(phase =>
        phase.id === phaseId
          ? {
              ...phase,
              tasks: phase.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              )
            }
          : phase
      );

      // Check if the current phase is now fully completed
      const currentPhaseIndex = updatedPhases.findIndex(p => p.id === phaseId);
      const currentPhase = updatedPhases[currentPhaseIndex];
      const allTasksCompleted = currentPhase.tasks.every(task => task.completed);

      // If all tasks are completed, mark phase as completed and move to next
      if (allTasksCompleted && currentPhase.status !== 'completed') {
        updatedPhases[currentPhaseIndex] = {
          ...currentPhase,
          status: 'completed'
        };

        // Move to next phase if available
        const nextPhaseIndex = currentPhaseIndex + 1;
        if (nextPhaseIndex < updatedPhases.length) {
          // Mark next phase as in-progress
          updatedPhases[nextPhaseIndex] = {
            ...updatedPhases[nextPhaseIndex],
            status: 'in-progress'
          };
          
          // Auto-select the next phase
          setTimeout(() => setSelectedPhaseId(updatedPhases[nextPhaseIndex].id), 500);
        }
      } else if (!allTasksCompleted && currentPhase.status === 'completed') {
        // If a task was unchecked, revert phase to in-progress
        updatedPhases[currentPhaseIndex] = {
          ...currentPhase,
          status: 'in-progress'
        };
      }

      return {
        ...prev,
        phases: updatedPhases
      };
    });
  };

  const getPhaseProgress = (phase) => {
    const completed = phase.tasks.filter(task => task.completed).length;
    return Math.round((completed / phase.tasks.length) * 100);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'fertilizer': 'bg-green-100 text-green-700 border-green-300',
      'pest-control': 'bg-red-100 text-red-700 border-red-300',
      'disease-control': 'bg-orange-100 text-orange-700 border-orange-300'
    };
    return colors[category] || '';
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  🌱 Crop Cultivation Roadmap
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg capitalize">
                  {currentRoadmapData.cropName} Cultivation Guide
                </p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                    Current Phase: {currentActivePhase.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Farm Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Planting Date</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date(currentRoadmapData.plantingDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Expected Harvest</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {new Date(currentRoadmapData.harvestDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Duration</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentRoadmapData.totalDuration}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Area</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {currentRoadmapData.area} acres
                </p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Overall Progress
                </span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {completedTasks} / {totalTasks} tasks completed ({progressPercentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Phase Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Cultivation Timeline
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>

              {/* Phase Cards */}
              <div className="space-y-8">
                {currentRoadmapData.phases.map((phase, index) => {
                  const phaseProgress = getPhaseProgress(phase);
                  const isLeft = index % 2 === 0;

                  return (
                    <div
                      key={phase.id}
                      className={`relative flex items-center ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      } flex-col`}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-4 border-green-500 z-10"></div>

                      {/* Phase Card */}
                      <div
                        className={`w-full md:w-5/12 ${
                          isLeft ? 'md:pr-12 pl-12 md:pl-0' : 'md:pl-12 pl-12 md:pr-0'
                        }`}
                      >
                        <div
                          onClick={() => setSelectedPhaseId(phase.id)}
                          className={`cursor-pointer bg-gradient-to-br ${
                            phase.status === 'completed'
                              ? 'from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/40 border-green-500'
                              : phase.status === 'in-progress'
                              ? 'from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 border-blue-500'
                              : 'from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600 border-gray-300'
                          } border-2 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {phase.name}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                phase.status === 'completed'
                                  ? 'bg-green-500 text-white'
                                  : phase.status === 'in-progress'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-400 text-white'
                              }`}
                            >
                              {phase.status === 'completed'
                                ? '✓ Completed'
                                : phase.status === 'in-progress'
                                ? '⟳ In Progress'
                                : 'Upcoming'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            📅 {phase.duration} | Day {phase.startDay} - {phase.endDay}
                          </p>
                          <div className="mb-2">
                            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                              <span>Progress</span>
                              <span className="font-semibold">{phaseProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  phase.status === 'completed'
                                    ? 'bg-green-500'
                                    : phase.status === 'in-progress'
                                    ? 'bg-blue-500'
                                    : 'bg-gray-400'
                                }`}
                                style={{ width: `${phaseProgress}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {phase.tasks.length} tasks
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Phase Tasks */}
          {selectedPhase && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPhase.name} - Task Checklist
                </h2>
                <button
                  onClick={() => setShowAllTasks(!showAllTasks)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  {showAllTasks ? 'Show Selected Phase' : 'Show All Tasks'}
                </button>
              </div>

              <div className="space-y-4">
                {(showAllTasks
                  ? currentRoadmapData.phases.flatMap(phase =>
                      phase.tasks.map(task => ({ ...task, phaseName: phase.name, phaseId: phase.id }))
                    )
                  : selectedPhase.tasks.map(task => ({ ...task, phaseId: selectedPhase.id }))
                ).map((task) => (
                  <div
                    key={task.id}
                    className={`border-2 rounded-xl p-5 transition-all duration-300 ${
                      task.completed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                    }`}
                  >
                    <div className="flex items-start">
                      {/* Checkbox */}
                      <div className="flex items-center h-6 mr-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskToggle(task.phaseId, task.id)}
                          className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                        />
                      </div>

                      {/* Task Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4
                            className={`text-lg font-semibold ${
                              task.completed
                                ? 'text-gray-500 dark:text-gray-400 line-through'
                                : 'text-gray-900 dark:text-white'
                            }`}
                          >
                            {task.title}
                          </h4>
                          <div className="flex gap-2">
                            {task.category && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                                  task.category
                                )}`}
                              >
                                {task.category.replace('-', ' ').toUpperCase()}
                              </span>
                            )}
                            {task.recurring && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-300">
                                🔄 RECURRING
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          📅 <strong>{task.day}</strong>
                          {showAllTasks && task.phaseName && (
                            <span className="ml-3 text-blue-600 dark:text-blue-400">
                              Phase: {task.phaseName}
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export/Print Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  💡 Tip: Check off tasks as you complete them to track your progress
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Roadmap;
