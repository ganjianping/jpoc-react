import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const canvasFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Browser Fingerprint', 0, 0);
    return canvas.toDataURL();
}

const isLocalStorageAvailable = () => {
  try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return "Yes";
  } catch (e) {
      return "No";
  }
}

const isSessionStorageAvailable = () => {
  try {
      const testKey = 'test';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return "Yes";
  } catch (e) {
      return "No";
  }
}

const BrowserDeviceInfo = () => {
  const deviceInfo = [
    { label: 'User Agent', value: navigator.userAgent },
    { label: 'Platform', value: navigator.platform },
    { label: 'Language', value: navigator.language },
    { label: 'Hardware Concurrency', value: navigator.hardwareConcurrency },
    { label: 'Cookies Enabled', value: navigator.cookieEnabled ? 'Yes' : 'No' },
    { label: 'Screen Width & Height', value: `${window.screen.width} & ${window.screen.height}` },
    { label: 'Available Width & Height', value: `${window.screen.availWidth} & ${window.screen.availHeight}` },
    { label: 'Outer Width & Height', value: `${window.outerWidth} & ${window.outerHeight}` },
    { label: 'Inner Width & Height', value: `${window.innerWidth} & ${window.innerHeight}` },
    { label: 'localStorage', value: isLocalStorageAvailable() },
    { label: 'sessionStorage', value: isSessionStorageAvailable() },
    { label: 'Color Depth', value: `${window.screen.colorDepth}-bit` },
    { label: 'Pixel Depth', value: window.screen.pixelDepth },
    { label: 'Timezone Offset', value: new Date().getTimezoneOffset() },
    { label: 'Canvas Fingerprint', value: canvasFingerprint() },
  ];

  return (
    <>
      <Typography variant="h6">Browser & Device Info:</Typography>
      <TableContainer component={Paper} sx={{ mt: 1, maxWidth: '100%' }}>
        <Table>
          <TableBody>
            {deviceInfo.map((info, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {info.label}
                </TableCell>
                <TableCell sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>{info.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BrowserDeviceInfo;
