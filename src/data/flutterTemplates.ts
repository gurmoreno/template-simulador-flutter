import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';

export const COLOR_PALETTES: PaletteOption[] = [
  {
    id: 'luna',
    name: 'Luna Ocean (Ciano & Azul)',
    // primary/secondary definidos por contraste medido, não por gosto:
    // #26658C com texto branco = 6.32:1 (aprova WCAG AA)
    // #54ACBF com texto branco = 2.62:1 (reprova) — serve como destaque, e como
    // primary APENAS no tema escuro, onde contrasta 6.47:1 com o azul-noite.
    // Não inverter de volta.
    primary: '#26658C',   // Azul Médio — ação primária no tema claro
    secondary: '#54ACBF', // Ciano — destaque
    accentGreen: '#A7EBF2', // Ciano Suave
    neutralGray: '#023859', // Azul Escuro Slate
    surfaceLight: '#FFFFFF',
    surfaceDark: '#023859',
    backgroundLight: '#EBF8FA',
    backgroundDark: '#011C40',
  },
  {
    id: 'material-blue-green',
    name: 'Material 3 Azul & Verde',
    primary: '#1E88E5', // Material Blue
    secondary: '#2E7D32', // Emerald Green
    accentGreen: '#4CAF50',
    neutralGray: '#607D8B', // Slate / Blue Gray
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E293B',
    backgroundLight: '#F8FAFC',
    backgroundDark: '#0F172A',
  },
  {
    id: 'slate-blue-mint',
    name: 'Azul Executivo & Menta',
    primary: '#2563EB',
    secondary: '#10B981',
    accentGreen: '#34D399',
    neutralGray: '#64748B',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#1E293B',
    backgroundLight: '#F1F5F9',
    backgroundDark: '#090D16',
  },
  {
    id: 'cyber-green-blue',
    name: 'Verde Floresta & Azul Céu',
    primary: '#0D9488',
    secondary: '#0284C7',
    accentGreen: '#10B981',
    neutralGray: '#475569',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#111827',
    backgroundLight: '#F0FDFA',
    backgroundDark: '#030712',
  },
];

export function generateFlutterThemeCode(palette: PaletteOption): string {
  return `import 'package:flutter/material.dart';

class AppTheme {
  // Configuração da Paleta de Cores Material 3 (Azul, Verde, Cinza)
  static const Color primaryBlue = Color(0xFF${palette.primary.replace('#', '')});
  static const Color secondaryGreen = Color(0xFF${palette.secondary.replace('#', '')});
  static const Color neutralGray = Color(0xFF${palette.neutralGray.replace('#', '')});

  // Tema Claro (Light Mode)
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        primary: primaryBlue,
        secondary: secondaryGreen,
        surface: const Color(0xFF${palette.surfaceLight.replace('#', '')}),
        brightness: Brightness.light,
      ),
      scaffoldBackgroundColor: const Color(0xFF${palette.backgroundLight.replace('#', '')}),
      appBarTheme: const AppBarTheme(
        centerTitle: true,
        elevation: 0,
        scrolledUnderElevation: 2,
        backgroundColor: Color(0xFF${palette.surfaceLight.replace('#', '')}),
        titleTextStyle: TextStyle(
          color: Color(0xFF0F172A),
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 1,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryBlue,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primaryBlue, width: 2),
        ),
      ),
    );
  }

  // Tema Escuro (Dark Mode)
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        primary: primaryBlue,
        secondary: secondaryGreen,
        surface: const Color(0xFF${palette.surfaceDark.replace('#', '')}),
        brightness: Brightness.dark,
      ),
      scaffoldBackgroundColor: const Color(0xFF${palette.backgroundDark.replace('#', '')}),
      appBarTheme: const AppBarTheme(
        centerTitle: true,
        elevation: 0,
        scrolledUnderElevation: 2,
        backgroundColor: Color(0xFF${palette.surfaceDark.replace('#', '')}),
        titleTextStyle: TextStyle(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
      ),
      cardTheme: CardTheme(
        elevation: 2,
        color: const Color(0xFF${palette.surfaceDark.replace('#', '')}),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryBlue,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(52),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF1E293B),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF334155)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Color(0xFF334155)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primaryBlue, width: 2),
        ),
      ),
    );
  }
}
`;
}

export function generateMainDartCode(
  config: ScreenConfig,
  themeMode: ThemeMode,
  palette: PaletteOption
): string {
  return `import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  ThemeMode _themeMode = ThemeMode.${themeMode};

  void toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${config.appBarTitle}',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _themeMode,
      home: HomeScreen(onToggleTheme: toggleTheme),
    );
  }
}

// ==========================================
// TEMA MATERIAL 3 (Azul, Verde, Cinza)
// ==========================================
class AppTheme {
  static const Color primaryBlue = Color(0xFF${palette.primary.replace('#', '')});
  static const Color secondaryGreen = Color(0xFF${palette.secondary.replace('#', '')});
  static const Color neutralGray = Color(0xFF${palette.neutralGray.replace('#', '')});

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        primary: primaryBlue,
        secondary: secondaryGreen,
        brightness: Brightness.light,
      ),
      scaffoldBackgroundColor: const Color(0xFF${palette.backgroundLight.replace('#', '')}),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.grey.shade100,
        border: const UnderlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
        enabledBorder: const UnderlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
        focusedBorder: const UnderlineInputBorder(
          borderSide: BorderSide(color: primaryBlue, width: 2),
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
      ),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryBlue,
        primary: primaryBlue,
        secondary: secondaryGreen,
        brightness: Brightness.dark,
      ),
      scaffoldBackgroundColor: const Color(0xFF${palette.backgroundDark.replace('#', '')}),
      inputDecorationTheme: const InputDecorationTheme(
        filled: true,
        fillColor: Color(0xFF1E293B),
        border: UnderlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
        enabledBorder: UnderlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
        focusedBorder: UnderlineInputBorder(
          borderSide: BorderSide(color: primaryBlue, width: 2),
          borderRadius: BorderRadius.only(topLeft: Radius.circular(8), topRight: Radius.circular(8)),
        ),
      ),
    );
  }
}

// ==========================================
// TELA ATIVA: ${config.title.toUpperCase()}
// ==========================================
class HomeScreen extends StatefulWidget {
  final VoidCallback onToggleTheme;

  const HomeScreen({super.key, required this.onToggleTheme});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      ${config.showAppBar ? `appBar: AppBar(
        title: Text('${config.appBarTitle}'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: widget.onToggleTheme,
            tooltip: 'Alternar Tema',
          ),
        ],
      ),` : ''}
      ${config.showDrawer ? `drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            UserAccountsDrawerHeader(
              accountName: const Text('Usuário Flutter'),
              accountEmail: const Text('usuario@exemplo.com'),
              currentAccountPicture: const CircleAvatar(
                backgroundColor: Colors.white,
                child: Icon(Icons.person, color: AppTheme.primaryBlue, size: 36),
              ),
              decoration: const BoxDecoration(
                color: AppTheme.primaryBlue,
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Início'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text('Perfil'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.settings),
              title: const Text('Configurações'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),` : ''}
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ${getScreenContentBody(config.id)}
            ],
          ),
        ),
      ),
      ${config.showFAB ? `floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Ação primária executada!')),
          );
        },
        backgroundColor: AppTheme.secondaryGreen,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Novo Item', style: TextStyle(color: Colors.white)),
      ),` : ''}
      ${config.showBottomNav ? `bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home, color: AppTheme.primaryBlue),
            label: 'Início',
          ),
          NavigationDestination(
            icon: Icon(Icons.bar_chart_outlined),
            selectedIcon: Icon(Icons.bar_chart, color: AppTheme.primaryBlue),
            label: 'Métricas',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person, color: AppTheme.primaryBlue),
            label: 'Perfil',
          ),
        ],
      ),` : ''}
    );
  }
}
\${getExtraWidgets(config.id)}
`;
}

function getScreenContentBody(screenId: string): string {
  switch (screenId) {
    case 'cadastro':
      return `
              // E1-01 Cadastro Autônomo
              const _CadastroView(),
`;
    default:
      return `
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.architecture,
                      size: 64,
                      color: AppTheme.neutralGray,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Protótipo Vazio',
                      style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: AppTheme.neutralGray,
                          ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Pronto para receber o novo código Flutter.',
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),
              )
`;
  }
}

function getExtraWidgets(screenId: string): string {
  if (screenId === 'cadastro') {
    return `
// ==========================================
// WIDGETS PRIVADOS
// ==========================================

enum CadastroState { preenchendo, enviando, erroValidacao, menorDeIdade, emailExistente, erroRede, sucesso }

class _CadastroView extends StatefulWidget {
  const _CadastroView();

  @override
  State<_CadastroView> createState() => _CadastroViewState();
}

class _CadastroViewState extends State<_CadastroView> {
  CadastroState _currentState = CadastroState.preenchendo;
  bool _termosAceitos = false;
  
  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  final _dataNascController = TextEditingController();

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    _senhaController.dispose();
    _dataNascController.dispose();
    super.dispose();
  }

  void _tentarCadastrar() {
    setState(() => _currentState = CadastroState.enviando);
    
    // Simulação de regras (RN-02, RN-06, Erro genérico)
    Future.delayed(const Duration(seconds: 2), () {
      if (!mounted) return;
      
      final email = _emailController.text.trim().toLowerCase();
      final data = _dataNascController.text;

      if (data == '2010-01-01' || data.contains('2010')) {
        setState(() => _currentState = CadastroState.menorDeIdade);
      } else if (email.contains('existente')) {
        setState(() => _currentState = CadastroState.emailExistente);
      } else if (email.contains('erro')) {
        setState(() => _currentState = CadastroState.erroRede);
      } else {
        setState(() => _currentState = CadastroState.sucesso);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_currentState == CadastroState.sucesso) {
      return _buildSucesso();
    }

    final bloqueado = _currentState == CadastroState.enviando || _currentState == CadastroState.sucesso;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Criar conta de atleta',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
            ),
            const SizedBox(height: 32),
            
            TextField(
              controller: _nomeController,
              enabled: !bloqueado,
              decoration: const InputDecoration(
                labelText: 'Nome Completo *',
                hintText: 'Ex: Gustavo Silva',
                prefixIcon: Icon(Icons.person_outline),
              ),
            ),
            const SizedBox(height: 16),
            
            TextField(
              controller: _emailController,
              enabled: !bloqueado,
              decoration: InputDecoration(
                labelText: 'E-mail de Acesso *',
                hintText: 'gustavo.silva@exemplo.com',
                prefixIcon: const Icon(Icons.email_outlined),
                errorText: _currentState == CadastroState.emailExistente 
                  ? 'Este e-mail já está em uso na plataforma. Faça login ou recupere a senha.' 
                  : null,
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16),
            
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: TextField(
                    controller: _dataNascController,
                    enabled: !bloqueado,
                    decoration: InputDecoration(
                      labelText: 'Nascimento *',
                      hintText: 'AAAA-MM-DD',
                      errorText: _currentState == CadastroState.menorDeIdade
                        ? 'O cadastro autônomo é restrito a maiores de 18 anos.'
                        : null,
                      errorMaxLines: 2,
                    ),
                    keyboardType: TextInputType.datetime,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: _senhaController,
                    enabled: !bloqueado,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Senha (mín 8) *',
                      hintText: '••••••••',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 48,
                  width: 48,
                  child: Checkbox(
                    value: _termosAceitos,
                    onChanged: bloqueado ? null : (v) => setState(() => _termosAceitos = v ?? false),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 14),
                    child: Text(
                      'Li e concordo com os Termos de Uso e Política de Privacidade.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),

            if (_currentState == CadastroState.erroRede) ...[
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.errorContainer,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(Icons.error_outline, color: Theme.of(context).colorScheme.onErrorContainer),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Não foi possível conectar. Verifique sua internet e tente de novo.',
                        style: TextStyle(color: Theme.of(context).colorScheme.onErrorContainer),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
            ],

            FilledButton(
              onPressed: (_termosAceitos && !bloqueado) ? _tentarCadastrar : null,
              style: FilledButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: _currentState == CadastroState.enviando
                  ? const SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                    )
                  : const Text('Criar conta'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSucesso() {
    final nomeDigitado = _nomeController.text.trim();
    final slug = nomeDigitado.isEmpty ? 'atleta' : nomeDigitado.toLowerCase().replaceAll(' ', '.');
    final handleGerado = '@$slug.123';

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 480),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.check_circle_outline,
              size: 64,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: 24),
            Text(
              'Conta criada com sucesso!',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onSurface,
                  ),
            ),
            const SizedBox(height: 16),
            Text(
              'O seu identificador único gerado pelo sistema é:',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                handleGerado,
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.2,
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Enviamos um e-mail de verificação para \${_emailController.text}. '
              'Você já pode acessar a plataforma.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 32),
            FilledButton(
              onPressed: () {
                // Aqui navegaria para Home/Dashboard real
              },
              style: FilledButton.styleFrom(
                minimumSize: const Size.fromHeight(48),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('Entrar na Plataforma'),
            ),
          ],
        ),
      ),
    );
  }
}
`;
  }
  return '';
}

export function generatePubspecYaml(config: ScreenConfig): string {
  return `name: flutter_ui_studio_app
description: "Aplicativo Flutter prototipado no Google AI Studio (Material 3, Android, iOS, Web)."
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.8
  google_fonts: ^6.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`;
}

export function generateGithubWorkflow(): string {
  return `name: Build & Test Flutter App

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up Java JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Set up Flutter SDK
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.x'
          channel: 'stable'
          cache: true

      - name: Install Dependencies
        run: flutter pub get

      - name: Run Linter
        run: flutter analyze

      - name: Build Web Application
        run: flutter build web --release

      - name: Build Android APK
        run: flutter build apk --split-per-abi
`;
}
