import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Weekly Reports
          </h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
        
        <div className="text-center py-24 bg-white/80 backdrop-blur shadow-lg rounded-lg">
          <FileText className="w-20 h-20 mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-700">Reports Coming Soon</h2>
          <p className="text-slate-500 mt-2">This section is under construction. Check back later for automated weekly summaries!</p>
        </div>
      </div>
    </div>
  );
}