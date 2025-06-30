import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUpload, FiPlay, FiDownload, FiSettings } from 'react-icons/fi';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const VideoContainer = styled.div`
  padding: 40px;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  height: calc(100% - 120px);
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 24px;
`;

const VideoPreview = styled.div`
  background: ${props => props.theme.secondary};
  border: 2px dashed ${props => props.theme.border};
  border-radius: 12px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
`;

const PreviewContent = styled.div`
  text-align: center;
  color: ${props => props.theme.textSecondary};
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  background: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.text};
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
  
  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
`;

const DropZone = styled.div`
  border: 2px dashed ${props => props.isDragActive ? props.theme.accent : props.theme.border};
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isDragActive ? `${props.theme.accent}10` : 'transparent'};
  
  &:hover {
    border-color: ${props => props.theme.accent};
  }
`;

const Button = styled(motion.button)`
  background: ${props => props.primary ? props.theme.accent : props.theme.secondary};
  color: ${props => props.primary ? 'white' : props.theme.text};
  border: 1px solid ${props => props.primary ? props.theme.accent : props.theme.border};
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function VideoTool() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('velqis');
  const [duration, setDuration] = useState('5');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploadedImage(URL.createObjectURL(file));
        toast.success('Image uploaded successfully!');
      }
    }
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    
    try {
      toast.success('Video generation started!');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Video generated successfully!');
    } catch (error) {
      toast.error('Failed to generate video');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <VideoContainer>
      <Header>
        <Title>Video Generator</Title>
        <Subtitle>Create videos from text prompts or transform images into video</Subtitle>
      </Header>

      <ContentGrid>
        <LeftPanel>
          <VideoPreview>
            <PreviewContent>
              {uploadedImage ? (
                <img src={uploadedImage} alt="Upload preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              ) : (
                <>
                  <FiPlay size={48} />
                  <p>Generated video will appear here</p>
                </>
              )}
            </PreviewContent>
          </VideoPreview>
        </LeftPanel>

        <RightPanel>
          <FormGroup>
            <Label>Prompt</Label>
            <TextArea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create..."
              maxLength={500}
            />
            <div style={{ fontSize: '0.8rem', color: 'gray', marginTop: '4px' }}>
              {prompt.length}/500
            </div>
          </FormGroup>

          <FormGroup>
            <Label>Upload Image (Optional)</Label>
            <DropZone {...getRootProps()} isDragActive={isDragActive}>
              <input {...getInputProps()} />
              <FiUpload size={24} style={{ marginBottom: '8px' }} />
              <p>Drop an image here or click to upload</p>
            </DropZone>
          </FormGroup>

          <FormGroup>
            <Label>Model</Label>
            <Select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="velqis">Velqis Video Pro</option>
              <option value="runway">Runway Gen-3</option>
              <option value="stable">Stable Video Diffusion</option>
              <option value="pika">Pika Labs 1.0</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Duration</Label>
            <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
              <option value="3">3 seconds</option>
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
              <option value="15">15 seconds</option>
            </Select>
          </FormGroup>

          <Button
            primary
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlay />
            {isGenerating ? 'Generating...' : 'Generate Video'}
          </Button>
        </RightPanel>
      </ContentGrid>
    </VideoContainer>
  );
}

export default VideoTool; 