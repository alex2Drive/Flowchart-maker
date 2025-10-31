import { useState } from 'react';
import { useFlowStore } from '../store';
import { InputPort, OutputPort, CustomField, CustomFieldType } from '../types';
import { X, Plus, Trash2, ArrowDown, ArrowUp, FileText, Sliders } from 'lucide-react';

export default function PropertiesPanel() {
  const { selectedNode, updateNode, setSelectedNode, deleteNode } = useFlowStore();
  const [activeTab, setActiveTab] = useState<'general' | 'inputs' | 'outputs' | 'fields' | 'instruction'>('general');

  if (!selectedNode) {
    return null;
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNode(selectedNode.id, { label: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode(selectedNode.id, { description: e.target.value });
  };

  const handleInstructionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNode(selectedNode.id, { instruction: e.target.value });
  };

  const handleDelete = () => {
    deleteNode(selectedNode.id);
    setSelectedNode(null);
  };

  // Input management
  const addInput = () => {
    const currentInputs = selectedNode.data.inputs || [];
    const newInput: InputPort = {
      id: `input-${Date.now()}`,
      name: `input_${currentInputs.length + 1}`,
      type: 'any',
      required: false,
    };
    updateNode(selectedNode.id, { inputs: [...currentInputs, newInput] });
  };

  const updateInput = (index: number, field: keyof InputPort, value: any) => {
    const currentInputs = [...(selectedNode.data.inputs || [])];
    currentInputs[index] = { ...currentInputs[index], [field]: value };
    updateNode(selectedNode.id, { inputs: currentInputs });
  };

  const removeInput = (index: number) => {
    const currentInputs = [...(selectedNode.data.inputs || [])];
    currentInputs.splice(index, 1);
    updateNode(selectedNode.id, { inputs: currentInputs });
  };

  // Output management
  const addOutput = () => {
    const currentOutputs = selectedNode.data.outputs || [];
    const newOutput: OutputPort = {
      id: `output-${Date.now()}`,
      name: `output_${currentOutputs.length + 1}`,
      type: 'any',
    };
    updateNode(selectedNode.id, { outputs: [...currentOutputs, newOutput] });
  };

  const updateOutput = (index: number, field: keyof OutputPort, value: any) => {
    const currentOutputs = [...(selectedNode.data.outputs || [])];
    currentOutputs[index] = { ...currentOutputs[index], [field]: value };
    updateNode(selectedNode.id, { outputs: currentOutputs });
  };

  const removeOutput = (index: number) => {
    const currentOutputs = [...(selectedNode.data.outputs || [])];
    currentOutputs.splice(index, 1);
    updateNode(selectedNode.id, { outputs: currentOutputs });
  };

  // Field management
  const addField = () => {
    const currentFields = selectedNode.data.fields || [];
    const newField: CustomField = {
      id: `field-${Date.now()}`,
      name: `field_${currentFields.length + 1}`,
      label: `Field ${currentFields.length + 1}`,
      type: 'text',
      value: '',
    };
    updateNode(selectedNode.id, { fields: [...currentFields, newField] });
  };

  const updateField = (index: number, field: keyof CustomField, value: any) => {
    const currentFields = [...(selectedNode.data.fields || [])];
    currentFields[index] = { ...currentFields[index], [field]: value };
    updateNode(selectedNode.id, { fields: currentFields });
  };

  const removeField = (index: number) => {
    const currentFields = [...(selectedNode.data.fields || [])];
    currentFields.splice(index, 1);
    updateNode(selectedNode.id, { fields: currentFields });
  };

  const inputs = selectedNode.data.inputs || [];
  const outputs = selectedNode.data.outputs || [];
  const fields = selectedNode.data.fields || [];

  return (
    <div className="w-96 bg-gray-900 border-l border-gray-700 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Node Properties</h3>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 bg-gray-850">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
            activeTab === 'general'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('inputs')}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'inputs'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <ArrowDown className="w-3 h-3" />
          Inputs ({inputs.length})
        </button>
        <button
          onClick={() => setActiveTab('outputs')}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'outputs'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <ArrowUp className="w-3 h-3" />
          Outputs ({outputs.length})
        </button>
        <button
          onClick={() => setActiveTab('fields')}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'fields'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Sliders className="w-3 h-3" />
          Fields ({fields.length})
        </button>
        <button
          onClick={() => setActiveTab('instruction')}
          className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
            activeTab === 'instruction'
              ? 'bg-gray-800 text-white border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <FileText className="w-3 h-3" />
          Instruction
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Node Type
              </label>
              <div className="px-3 py-2 bg-gray-800 rounded border border-gray-700 text-sm text-gray-400">
                {selectedNode.data.type.toUpperCase()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Label
              </label>
              <input
                type="text"
                value={selectedNode.data.label}
                onChange={handleLabelChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                         text-white text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter node label"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={selectedNode.data.description || ''}
                onChange={handleDescriptionChange}
                rows={4}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                         text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Enter node description"
              />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white
                         rounded font-medium transition-colors"
              >
                Delete Node
              </button>
            </div>
          </div>
        )}

        {/* Inputs Tab */}
        {activeTab === 'inputs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Configure input ports for this node
              </p>
              <button
                onClick={addInput}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700
                         text-white rounded text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {inputs.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No input ports defined
              </div>
            )}

            {inputs.map((input, index) => (
              <div
                key={input.id}
                className="p-3 bg-gray-800 border border-gray-700 rounded space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-400">
                    Input #{index + 1}
                  </span>
                  <button
                    onClick={() => removeInput(index)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={input.name}
                    onChange={(e) => updateInput(index, 'name', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="input_name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Type</label>
                  <select
                    value={input.type || 'any'}
                    onChange={(e) => updateInput(index, 'type', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="any">any</option>
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`required-${input.id}`}
                    checked={input.required || false}
                    onChange={(e) => updateInput(index, 'required', e.target.checked)}
                    className="w-4 h-4 bg-gray-900 border-gray-600 rounded"
                  />
                  <label
                    htmlFor={`required-${input.id}`}
                    className="text-xs text-gray-400"
                  >
                    Required
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Outputs Tab */}
        {activeTab === 'outputs' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Configure output ports for this node
              </p>
              <button
                onClick={addOutput}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700
                         text-white rounded text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {outputs.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No output ports defined
              </div>
            )}

            {outputs.map((output, index) => (
              <div
                key={output.id}
                className="p-3 bg-gray-800 border border-gray-700 rounded space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-400">
                    Output #{index + 1}
                  </span>
                  <button
                    onClick={() => removeOutput(index)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={output.name}
                    onChange={(e) => updateOutput(index, 'name', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="output_name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Type</label>
                  <select
                    value={output.type || 'any'}
                    onChange={(e) => updateOutput(index, 'type', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="any">any</option>
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                    <option value="object">object</option>
                    <option value="array">array</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fields Tab */}
        {activeTab === 'fields' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Add custom fields to display on the node
              </p>
              <button
                onClick={addField}
                className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700
                         text-white rounded text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {fields.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                No custom fields defined
              </div>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-3 bg-gray-800 border border-gray-700 rounded space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-orange-400">
                    Field #{index + 1}
                  </span>
                  <button
                    onClick={() => removeField(index)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Label (shown on node)</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(index, 'label', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-orange-500"
                    placeholder="Field label"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Internal Name</label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateField(index, 'name', e.target.value)}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-orange-500"
                    placeholder="field_name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Field Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newType = e.target.value as CustomFieldType;
                      updateField(index, 'type', newType);
                      // Reset value based on type
                      if (newType === 'boolean') {
                        updateField(index, 'value', false);
                      } else if (newType === 'number') {
                        updateField(index, 'value', 0);
                      } else {
                        updateField(index, 'value', '');
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                             text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="select">Select</option>
                  </select>
                </div>

                {field.type === 'select' && (
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">
                      Options (comma separated)
                    </label>
                    <input
                      type="text"
                      value={(field.options || []).join(', ')}
                      onChange={(e) => {
                        const options = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        updateField(index, 'options', options);
                      }}
                      className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                               text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder="option1, option2, option3"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Value</label>
                  {field.type === 'boolean' ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={(e) => updateField(index, 'value', e.target.checked)}
                        className="w-4 h-4 bg-gray-900 border-gray-600 rounded"
                      />
                      <span className="text-xs text-gray-400">
                        {field.value ? 'True' : 'False'}
                      </span>
                    </div>
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                               text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder={field.placeholder || 'Enter number'}
                    />
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', e.target.value)}
                      rows={3}
                      className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                               text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                      placeholder={field.placeholder || 'Enter text'}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', e.target.value)}
                      className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                               text-white text-sm focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select option...</option>
                      {(field.options || []).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateField(index, 'value', e.target.value)}
                      className="w-full px-2 py-1.5 bg-gray-900 border border-gray-600 rounded
                               text-white text-sm focus:outline-none focus:border-orange-500"
                      placeholder={field.placeholder || 'Enter value'}
                    />
                  )}
                </div>
              </div>
            ))}

            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded">
              <p className="text-xs text-orange-300">
                <strong>Tip:</strong> Custom fields are displayed directly on the node in
                the diagram. Use them for key parameters like model, temperature, API keys, etc.
              </p>
            </div>
          </div>
        )}

        {/* Instruction Tab */}
        {activeTab === 'instruction' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400">
              Define the instruction or behavior for this node
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instruction
              </label>
              <textarea
                value={selectedNode.data.instruction || ''}
                onChange={handleInstructionChange}
                rows={12}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded
                         text-white text-sm focus:outline-none focus:border-blue-500
                         resize-none font-mono"
                placeholder="Enter detailed instruction for this node...

Example for LLM node:
You are a helpful assistant. Analyze the input and provide a concise summary.

Example for Function node:
Process the input data and return the transformed result.
"
              />
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
              <p className="text-xs text-blue-300">
                <strong>Tip:</strong> Use this field to define what this node should do,
                what parameters it expects, and what it should return.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
