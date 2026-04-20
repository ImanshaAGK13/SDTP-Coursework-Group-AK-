-- PAS: Project Approval System - Demo Seed Data (Updated Credentials)
-- Run this script in your SQL Server instance to populate data for the presentation.

-- 1. CLEANUP
DELETE FROM [Proposals];
DELETE FROM [Users];

-- 2. INSERT USERS (Using specific user-requested credentials)
INSERT INTO [Users] ([Email], [Password], [Role], [FullName], [InstitutionalId], [Expertise])
VALUES 
(N'student@pas.com', N'student@123', N'Student', N'Amara Perera', N'ST-1001', NULL),
(N'supervisor@pas.com', N'super@123', N'Supervisor', N'Dr. Aruna Gunawardena', N'SV-2001', N'AI, Machine Learning, Data Science'),
(N'leader@pas.com', N'leader@123', N'Module Leader', N'System Administration', N'ML-3001', NULL);

-- 3. INSERT SAMPLE PROPOSALS
-- Pending proposals (Anonymous in the Gallery)
INSERT INTO [Proposals] ([Title], [Abstract], [Status], [CreatedAt], [StudentId], [TechStack], [ResearchArea], [ProjectType])
VALUES 
(N'AI Driven Traffic Management System', N'A cloud-based real-time traffic optimization system using computer vision.', N'Pending', GETUTCDATE(), 1, N'Python, OpenCV, AWS', N'AI', N'Individual'),
(N'Blockchain for Medical Records', N'Securing patient data using a decentralized ledger for private hospital networks.', N'Pending', GETUTCDATE(), 1, N'Solidity, Ethereum, React', N'Cyber Security', N'Individual'),
(N'E-Learning Personalization Engine', N'Using Machine Learning to adapt course content to individual student progress.', N'Pending', GETUTCDATE(), 1, N'Python, PyTorch, React', N'Educational Tech', N'Individual');

-- Matched proposal (Already approved)
INSERT INTO [Proposals] ([Title], [Abstract], [Status], [CreatedAt], [StudentId], [SupervisorId], [TechStack], [ResearchArea])
VALUES 
(N'Quantum Cryptography Simulation', N'A Python-based simulation of QKD protocols for secure communication.', N'Matched', GETUTCDATE(), 1, 2, N'Python, Qiskit', N'Quantum Computing');

PRINT 'Demo data successfully seeded with requested credentials.';
GO
