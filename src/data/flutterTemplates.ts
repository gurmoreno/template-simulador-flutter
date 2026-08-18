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
`;
}

function getScreenContentBody(screenId: string): string {
  switch (screenId) {
    case 'cadastro':
      return `
              // Abas limpas
              Row(
                children: [
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      decoration: const BoxDecoration(
                        border: Border(bottom: BorderSide(color: AppTheme.primaryBlue, width: 2)),
                      ),
                      child: const Text(
                        'Primeiro Cadastro',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: AppTheme.primaryBlue, fontWeight: FontWeight.w600, fontSize: 14),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      decoration: BoxDecoration(
                        border: Border(bottom: BorderSide(color: Colors.grey.shade300, width: 1)),
                      ),
                      child: const Text(
                        'Acesso via Convite',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.grey, fontWeight: FontWeight.w500, fontSize: 14),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              const Text(
                'Criar conta de atleta',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 24),
              
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Nome Completo *',
                  prefixIcon: Icon(Icons.person_outline),
                ),
              ),
              const SizedBox(height: 16),
              
              const TextField(
                decoration: InputDecoration(
                  labelText: 'ID de usuário *',
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(15.0),
                    child: Text('@', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey, fontSize: 16)),
                  ),
                  hintText: 'gustavo.silva',
                ),
              ),
              const SizedBox(height: 16),

              const TextField(
                decoration: InputDecoration(
                  labelText: 'E-mail de Acesso *',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),
              
              Row(
                children: [
                  Expanded(
                    child: const TextField(
                      decoration: InputDecoration(
                        labelText: 'Nascimento *',
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: const TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: 'Senha (min 8) *',
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
                    height: 24,
                    width: 24,
                    child: Checkbox(value: true, onChanged: (v) {}),
                  ),
                  const SizedBox(width: 8),
                  const Expanded(
                    child: Text(
                      'Li e concordo com os Termos de Uso e Política de Privacidade.',
                      style: TextStyle(fontSize: 13),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  elevation: 0,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: const Text('Concluir cadastro'),
              ),
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
