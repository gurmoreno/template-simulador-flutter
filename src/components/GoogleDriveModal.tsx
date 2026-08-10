import React, { useState, useEffect } from 'react';
import {
  X,
  HardDrive,
  CloudUpload,
  FolderPlus,
  FileCode,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogOut,
  RefreshCw,
  Folder,
  Palette,
  Layers
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logout,
  listDriveFiles,
  getOrCreateStudioFolder,
  uploadFileToDrive,
  deleteDriveFile,
  DriveFile,
  getAccessToken
} from '../services/driveService';
import { PaletteOption, ScreenConfig } from '../types';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDartCode: string;
  activePalette: PaletteOption;
  screens: ScreenConfig[];
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  currentDartCode,
  activePalette,
  screens
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [studioFolderId, setStudioFolderId] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  // Confirmation state for deleting files
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize Auth state
  useEffect(() => {
    if (!isOpen) return;

    const unsubscribe = initAuth(
      (usr) => {
        setUser(usr);
        setNeedsAuth(false);
        fetchStudioFiles();
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  const fetchStudioFiles = async () => {
    try {
      setLoading(true);
      setAuthError(null);
      const folderId = await getOrCreateStudioFolder();
      setStudioFolderId(folderId);
      const driveFiles = await listDriveFiles(folderId);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('401') || err.message?.includes('unauthenticated')) {
        setNeedsAuth(true);
      } else {
        setAuthError(err.message || 'Erro ao carregar arquivos do Google Drive.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        await fetchStudioFiles();
      }
    } catch (err: any) {
      setAuthError('Falha ao conectar com a Conta Google: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setFiles([]);
    setStudioFolderId(null);
  };

  // Export Flutter Code (main.dart) to Google Drive
  const handleExportDartCode = async () => {
    setLoading(true);
    setUploadStatus(null);
    try {
      const folderId = studioFolderId || (await getOrCreateStudioFolder());
      const fileName = `flutter_main_${new Date().toISOString().slice(0, 10)}_${Date.now().toString().slice(-4)}.dart`;
      const uploaded = await uploadFileToDrive(fileName, currentDartCode, 'text/x-dart', folderId);
      
      setUploadStatus({
        type: 'success',
        message: `Arquivo ${fileName} salvo no Google Drive com sucesso!`,
      });
      await fetchStudioFiles();
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: 'Erro ao salvar no Drive: ' + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Export Complete Flutter Project (JSON Spec with Code, Screens & Palette)
  const handleExportFullProject = async () => {
    setLoading(true);
    setUploadStatus(null);
    try {
      const folderId = studioFolderId || (await getOrCreateStudioFolder());
      const fileName = `flutter_ui_studio_project_${new Date().toISOString().slice(0, 10)}.json`;
      
      const projectData = {
        title: 'Flutter UI Studio Project Export',
        exportedAt: new Date().toISOString(),
        activePalette: activePalette,
        screens: screens,
        dartCode: currentDartCode,
        pubspec: `name: flutter_ui_studio_app
description: Flutter App exportada via Flutter UI Studio
version: 1.0.0+1
environment:
  sdk: ">=3.0.0 <4.0.0"
dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.1.0
  flutter_colorpicker: ^1.0.3
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
flutter:
  uses-material-design: true`,
      };

      await uploadFileToDrive(fileName, JSON.stringify(projectData, null, 2), 'application/json', folderId);
      
      setUploadStatus({
        type: 'success',
        message: `Projeto completo (${fileName}) exportado para o Google Drive!`,
      });
      await fetchStudioFiles();
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: 'Erro ao exportar projeto: ' + err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      setUploadStatus({
        type: 'success',
        message: `Arquivo "${fileToDelete.name}" excluído do Google Drive.`,
      });
      setFileToDelete(null);
      await fetchStudioFiles();
    } catch (err: any) {
      setUploadStatus({
        type: 'error',
        message: 'Erro ao excluir arquivo: ' + err.message,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 p-0.5 flex items-center justify-center text-white shadow-xs">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-teal-400" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Integração Google Drive
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Salve e sincronize seus protótipos Flutter (.dart, .json) na nuvem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* User Auth Section */}
          {needsAuth ? (
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/60 p-6 rounded-2xl border border-blue-100 dark:border-slate-700 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Conecte sua conta do Google Drive
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Faça login para criar a pasta <strong>Flutter UI Studio Projects</strong> no seu Drive e salvar o código fonte Dart e configurações de tela.
                </p>
              </div>

              {/* Standard Google Sign-In Button format as required by guidelines */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 font-medium text-xs border border-slate-300 dark:border-slate-600 shadow-xs hover:shadow-md transition cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{loading ? 'Conectando...' : 'Entrar com o Google'}</span>
                </button>
              </div>

              {authError && (
                <p className="text-xs text-rose-500 font-medium flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {authError}
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Logged in User Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-blue-500" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {user?.email?.[0].toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                      {user?.displayName || user?.email}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Conectado ao Google Drive
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchStudioFiles}
                    disabled={loading}
                    title="Atualizar arquivos"
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-medium border border-rose-200 dark:border-rose-800 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sair
                  </button>
                </div>
              </div>

              {/* Upload Status Banner */}
              {uploadStatus && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    uploadStatus.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}
                >
                  {uploadStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  )}
                  <span>{uploadStatus.message}</span>
                </div>
              )}

              {/* Action Export Buttons */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Ações de Exportação na Nuvem
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleExportDartCode}
                    disabled={loading}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition text-left group"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition">
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        Salvar Código Dart (.dart)
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Exporta o arquivo <code className="text-blue-600 dark:text-blue-300">main.dart</code> ativo para a pasta no Google Drive.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={handleExportFullProject}
                    disabled={loading}
                    className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-slate-800 transition text-left group"
                  >
                    <div className="p-2.5 rounded-lg bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition">
                      <CloudUpload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        Exportar Projeto Completo (.json)
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Inclui paleta de cores (ex: Luna), especificação de telas e Dart code.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Saved Files List in Google Drive Folder */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5 text-blue-500" />
                    Pasta: <span className="text-slate-800 dark:text-slate-200">Flutter UI Studio Projects</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {files.length} arquivo(s)
                  </span>
                </div>

                {loading && files.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    <span>Carregando arquivos do Google Drive...</span>
                  </div>
                ) : files.length === 0 ? (
                  <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <FolderPlus className="w-6 h-6 mx-auto text-slate-400" />
                    <p className="font-medium text-slate-700 dark:text-slate-300">Nenhum arquivo nesta pasta ainda.</p>
                    <p className="text-[11px]">Clique em um dos botões acima para exportar seu primeiro protótipo.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/40">
                    {files.map((file) => (
                      <div key={file.id} className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 shrink-0">
                            <FileCode className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2">
                              <span>
                                {file.modifiedTime
                                  ? new Date(file.modifiedTime).toLocaleDateString('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })
                                  : 'Drive file'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
                              title="Abrir no Google Drive"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => setFileToDelete(file)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            title="Excluir do Google Drive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Explicit User Confirmation Dialog for Delete (Mandatory by SKILL.md guidelines) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                Confirmar Exclusão
              </h4>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tem certeza que deseja excluir o arquivo <strong>"{fileToDelete.name}"</strong> do seu Google Drive?
              Esta ação removerá o arquivo permanentemente da nuvem.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Excluindo...
                  </>
                ) : (
                  'Confirmar Exclusão'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
