import React from 'react';
import { Edit, Trash, Send } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  user: string;
  date: string;
}

interface NotesTabProps {
  notes: Note[];
  showAddNoteForm: boolean;
  newNote: string;
  onShowAddNoteForm: () => void;
  onHideAddNoteForm: () => void;
  onNewNoteChange: (note: string) => void;
  onAddNote: () => void;
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  showAddNoteForm,
  newNote,
  onShowAddNoteForm,
  onHideAddNoteForm,
  onNewNoteChange,
  onAddNote,
  onEditNote,
  onDeleteNote
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Notlar</h2>
        
        <button 
          onClick={onShowAddNoteForm}
          className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center"
        >
          Not Ekle
        </button>
      </div>
      
      {showAddNoteForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Yeni Not</h3>
          <textarea
            value={newNote}
            onChange={(e) => onNewNoteChange(e.target.value)}
            placeholder="Başvuru ile ilgili bir not ekleyin..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
            rows={3}
          ></textarea>
          
          <div className="flex justify-end mt-3">
            <button
              onClick={onHideAddNoteForm}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2"
            >
              İptal
            </button>
            <button
              onClick={onAddNote}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 flex items-center"
            >
              <Send className="h-4 w-4 mr-1.5" />
              Kaydet
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div 
              key={note.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm">
                    {note.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{note.user}</div>
                    <div className="text-xs text-gray-500">{note.date}</div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onEditNote(note.id)}
                    className="p-1 text-gray-400 hover:text-primary-600 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => onDeleteNote(note.id)}
                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <p className="mt-3 text-sm text-gray-700">
                {note.text}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Bu başvuru için henüz not eklenmemiş.</p>
            <button 
              onClick={onShowAddNoteForm}
              className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              İlk notu ekleyin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesTab;
