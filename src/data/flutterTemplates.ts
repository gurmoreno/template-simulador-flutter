import { DevicePlatform, PaletteOption, ScreenConfig, ThemeMode } from '../types';

export const COLOR_PALETTES: PaletteOption[] = [
  {
    id: 'luna',
    name: 'Luna Ocean (Ciano & Azul)',
    primary: '#54ACBF', // Ciano Azulado
    secondary: '#26658C', // Azul Profundo
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
    case 'login':
      return `
              const SizedBox(height: 10),
              const Icon(
                Icons.directions_run,
                size: 70,
                color: AppTheme.primaryBlue,
              ),
              const SizedBox(height: 12),
              Text(
                'Gestão Esportiva',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 6),
              Text(
                'Cadastro Autônomo & Ativação por Convite (E1-01 / E1-02)',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppTheme.neutralGray,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 28),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'E-mail de Acesso',
                  prefixIcon: Icon(Icons.email_outlined),
                  hintText: 'atleta@exemplo.com',
                ),
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 14),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Handle Único (@id_publico)',
                  prefixIcon: Icon(Icons.alternate_email),
                  hintText: '@gustavo.silva',
                ),
              ),
              const SizedBox(height: 14),
              const TextField(
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Senha',
                  prefixIcon: Icon(Icons.lock_outline),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Checkbox(value: true, onChanged: (v) {}),
                  const Expanded(
                    child: Text(
                      'Aceito Termos & Consentimento de Saúde (E7-01)',
                      style: TextStyle(fontSize: 12),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),
              ElevatedButton(
                onPressed: () {},
                child: const Text('ENTRAR / ATIVAR CONVITE'),
              ),
              const SizedBox(height: 16),
              Card(
                color: AppTheme.primaryBlue.withOpacity(0.08),
                child: const Padding(
                  padding: EdgeInsets.all(12),
                  child: Text(
                    '💡 Atleta Portável: Seus treinos e histórico pertencem a você e acompanham sua evolução.',
                    style: TextStyle(fontSize: 11),
                  ),
                ),
              ),
`;

    case 'dashboard':
      return `
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Assessoria Performance 👋',
                        style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                            ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Score de Aderência Unificado',
                        style: TextStyle(color: AppTheme.neutralGray, fontSize: 13),
                      ),
                    ],
                  ),
                  const CircleAvatar(
                    radius: 22,
                    backgroundColor: AppTheme.primaryBlue,
                    child: Text('AP', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Card Score de Aderência F-03
              Card(
                color: AppTheme.primaryBlue,
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text(
                            'Score de Aderência Global',
                            style: TextStyle(color: Colors.white70, fontSize: 13),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppTheme.secondaryGreen,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Text(
                              'Meta 80%+',
                              style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.baseline,
                        textBaseline: TextBaseline.alphabetic,
                        children: const [
                          Text(
                            '84.5%',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(width: 8),
                          Text('de treinos concluídos', style: TextStyle(color: Colors.white70, fontSize: 12)),
                        ],
                      ),
                      const SizedBox(height: 14),
                      const LinearProgressIndicator(
                        value: 0.845,
                        backgroundColor: Colors.white24,
                        color: Colors.white,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Metrics Grid
              Row(
                children: [
                  Expanded(
                    child: Card(
                      child: Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.people_outline, color: AppTheme.primaryBlue),
                            const SizedBox(height: 6),
                            const Text('Atletas Ativos', style: TextStyle(color: Colors.grey, fontSize: 11)),
                            const SizedBox(height: 2),
                            Text(
                              '42 Atletas',
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Card(
                      child: Padding(
                        padding: const EdgeInsets.all(14.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Icon(Icons.pix_outlined, color: AppTheme.secondaryGreen),
                            const SizedBox(height: 6),
                            const Text('Faturamento PIX', style: TextStyle(color: Colors.grey, fontSize: 11)),
                            const SizedBox(height: 2),
                            Text(
                              'R$ 18.500',
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Treino Prescrito Destaque
              Text(
                'Treino Prescrito Destaque do Dia',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 10),
              Card(
                child: ListTile(
                  contentPadding: const EdgeInsets.all(12),
                  leading: const CircleAvatar(
                    backgroundColor: AppTheme.primaryBlue,
                    child: Icon(Icons.directions_run, color: Colors.white),
                  ),
                  title: const Text('Corrida — Intervalado 6x800m', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Aquecimento 15min + 6x (800m @ 4:15-4:30/km) + 10min Desaquecimento'),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryBlue.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text('Z3 Limiar', style: TextStyle(color: AppTheme.primaryBlue, fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ),
              ),
`;

    case 'products':
      return `
              const TextField(
                decoration: InputDecoration(
                  hintText: 'Buscar por nome ou @handle público...',
                  prefixIcon: Icon(Icons.search),
                ),
              ),
              const SizedBox(height: 16),

              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    FilterChip(
                      selected: true,
                      label: const Text('Todos (42)'),
                      onSelected: (v) {},
                      selectedColor: AppTheme.primaryBlue.withOpacity(0.2),
                    ),
                    const SizedBox(width: 8),
                    FilterChip(
                      selected: false,
                      label: const Text('Pelotão 5h'),
                      onSelected: (v) {},
                    ),
                    const SizedBox(width: 8),
                    FilterChip(
                      selected: false,
                      label: const Text('Iniciantes 10k'),
                      onSelected: (v) {},
                    ),
                    const SizedBox(width: 8),
                    FilterChip(
                      selected: false,
                      label: const Text('Triathlon Iron'),
                      onSelected: (v) {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              Card(
                child: ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: AppTheme.primaryBlue,
                    child: Text('GS', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                  title: const Text('Gustavo Silva (@gustavo.silva)', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Pelotão 5h • Pace Limiar: 4:20/km • Saúde Consentida'),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppTheme.secondaryGreen.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text('92% Aderência', style: TextStyle(color: AppTheme.secondaryGreen, fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ),
              ),
              const SizedBox(height: 8),

              Card(
                child: ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: AppTheme.secondaryGreen,
                    child: Text('CT', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  ),
                  title: const Text('Carla Teixeira (@carla.triathlon)', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('Triathlon Iron • FTP: 240W • Fatura PIX em Dia'),
                  trailing: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.amber.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text('75% Aderência', style: TextStyle(color: Colors.amber, fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ),
              ),
`;

    case 'settings':
      return `
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      const CircleAvatar(
                        radius: 26,
                        backgroundColor: AppTheme.primaryBlue,
                        child: Text('AP', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Assessoria Performance Pro', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                          SizedBox(height: 2),
                          Text('CNPJ 12.345.678/0001-90 • Marcos Treinador', style: TextStyle(color: Colors.grey, fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),

              Text('Gestão Financeira & Cobrança PIX', style: TextStyle(color: AppTheme.neutralGray, fontWeight: FontWeight.bold, fontSize: 12)),
              const SizedBox(height: 8),
              Card(
                child: Column(
                  children: const [
                    ListTile(
                      leading: Icon(Icons.rule_folder_outlined, color: AppTheme.primaryBlue),
                      title: Text('Régua de Inadimplência'),
                      subtitle: Text('Carência de 5 dias pós-vencimento antes da suspensão'),
                      trailing: Text('5 Dias', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primaryBlue)),
                    ),
                    Divider(height: 1),
                    ListTile(
                      leading: Icon(Icons.pix_outlined, color: AppTheme.secondaryGreen),
                      title: Text('Cobrança por QR Code PIX'),
                      subtitle: Text('Baixa instantânea via Webhook'),
                      trailing: Icon(Icons.check_circle, color: AppTheme.secondaryGreen, size: 20),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              Text('Privacidade & LGPD', style: TextStyle(color: AppTheme.neutralGray, fontWeight: FontWeight.bold, fontSize: 12)),
              const SizedBox(height: 8),
              Card(
                child: Column(
                  children: [
                    const ListTile(
                      leading: Icon(Icons.security_outlined),
                      title: Text('Consent Log Imutável'),
                      subtitle: Text('Termos v2.1 aceitos • IP 177.12.90.1'),
                      trailing: Icon(Icons.chevron_right),
                    ),
                    const Divider(height: 1),
                    ListTile(
                      leading: const Icon(Icons.download_outlined, color: Colors.teal),
                      title: const Text('Exportação de Dados'),
                      subtitle: const Text('Portabilidade em ZIP (JSON, CSV, FIT & GPX)'),
                      trailing: const Icon(Icons.open_in_new),
                      onTap: () {},
                    ),
                  ],
                ),
              ),
`;

    case 'form':
      return `
              Text(
                'Prescrição Estruturada & Motor de Zonas',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const TextField(
                decoration: InputDecoration(
                  labelText: 'Nome do Treino Prescrito',
                  prefixIcon: Icon(Icons.directions_run),
                  hintText: 'Intervalado de Tiro Limiar (6x800m)',
                ),
              ),
              const SizedBox(height: 14),
              Row(
                children: [
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: 'corrida',
                      items: const [
                        DropdownMenuItem(value: 'corrida', child: Text('Corrida')),
                        DropdownMenuItem(value: 'ciclismo', child: Text('Ciclismo')),
                        DropdownMenuItem(value: 'natacao', child: Text('Natação')),
                      ],
                      onChanged: (v) {},
                      decoration: const InputDecoration(labelText: 'Modalidade'),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      value: 'pace',
                      items: const [
                        DropdownMenuItem(value: 'pace', child: Text('Pace (min/km)')),
                        DropdownMenuItem(value: 'fc', child: Text('% FC Máx')),
                        DropdownMenuItem(value: 'potencia', child: Text('FTP (Watts)')),
                      ],
                      onChanged: (v) {},
                      decoration: const InputDecoration(labelText: 'Métrica'),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              Card(
                color: AppTheme.secondaryGreen.withOpacity(0.1),
                child: const Padding(
                  padding: EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('🎯 Motor de Zonas F-01 Ativo', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.secondaryGreen)),
                      SizedBox(height: 4),
                      Text('Z1 (Recuperação): >5:40/km  •  Z3 (Limiar): 4:20-4:35/km  •  Z5 (Tiro): <3:50/km', style: TextStyle(fontSize: 11)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.check),
                label: const Text('SALVAR E ATRIBUIR TREINO'),
              ),
`;

    case 'chat':
      return `
              Card(
                color: AppTheme.primaryBlue.withOpacity(0.1),
                child: const Padding(
                  padding: EdgeInsets.all(12.0),
                  child: Row(
                    children: [
                      Icon(Icons.chat_bubble_outline, color: AppTheme.primaryBlue),
                      SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          'Chat 1:1 Atleta ↔ Treinador com Contexto',
                          style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.grey.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Text('Treinador Marcos: Ótimo treino no 4º tiro! Manter o pace de 4:25 foi essencial.'),
                ),
              ),
              const SizedBox(height: 10),
              Align(
                alignment: Alignment.centerRight,
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryBlue,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Gustavo Silva: Valeu professor! Senti um pouco de desgaste (RPE 8). FC média 172 bpm.',
                        style: TextStyle(color: Colors.white),
                      ),
                      SizedBox(height: 6),
                      Text('🏃 10.2 km • 45min • Anexado', style: TextStyle(color: Colors.white70, fontSize: 10)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 30),
              const TextField(
                decoration: InputDecoration(
                  hintText: 'Digite feedback sobre a atividade...',
                  suffixIcon: Icon(Icons.send, color: AppTheme.primaryBlue),
                ),
              ),
`;

    default:
      return `
              const Center(
                child: Text('Conteúdo do Protótipo Gestão Esportiva'),
              );
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
