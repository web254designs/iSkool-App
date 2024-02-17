import React from 'react';
import { List, Input, Button } from 'antd';

const TeacherCommunication = ({ teacherCommunicationData, handleResponseChange, handleSendResponse, responses }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg min-h-screen shadow-md border-2 border-blue-500">
      <h2 className="text-lg font-bold mb-4 text-blue-500">Teacher Communications</h2>

      <List
  dataSource={Object.keys(teacherCommunicationData)}
  renderItem={(childId) => {
    const communication = teacherCommunicationData[childId];
    const hasCommunications = Array.isArray(communication.communications) && communication.communications.length > 0;

    return hasCommunications && (
        <List.Item key={`${childId}-${communication.communications.length}`}>
        <h3 className="text-lg font-bold mb-2">Child: {communication.childName}</h3>
        <ul>
          {communication.communications.map((msg, index) => (
            <li key={index}>
              <b>Message {index + 1}:</b> {msg.message}
            </li>
          ))}
        </ul>
        {/* Display responses below the messages */}
        {responses[childId] && (
          <div className="mb-2">
            <b>Your Response:</b> {responses[childId]}
          </div>
        )}
        {/* Add input and button for response */}
        <Input
          placeholder="Type your response here"
          value={responses[childId] || ''}
          onChange={(event) => handleResponseChange(childId, event)}
          className="mb-2"
        />
        <Button type="primary" onClick={() => handleSendResponse(childId)}>
          Send Response
        </Button>
      </List.Item>
    );
  }}
/>
    </div>
  );
};

export default TeacherCommunication;
