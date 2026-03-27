'use client';

import { useMemo } from 'react';
import { useI18n } from '@/lib/hooks/use-i18n';
import type { Scene, StageMode } from '@/lib/types/stage';
import { SlideEditor as SlideRenderer } from '../slide-renderer/Editor';
import { QuizView } from '../scene-renderers/quiz-view';
import { InteractiveRenderer } from '../scene-renderers/interactive-renderer';
import { PBLRenderer } from '../scene-renderers/pbl-renderer';

interface SceneRendererProps {
  readonly scene: Scene;
  readonly mode: StageMode;
}

export function SceneRenderer({ scene, mode }: SceneRendererProps) {
  const { t } = useI18n();

  const renderer = useMemo(() => {
    switch (scene.type) {
      case 'slide':
        if (scene.content.type !== 'slide') return <div>{t('stage.invalidSlideContent')}</div>;
        return <SlideRenderer mode={mode} />;
      case 'quiz':
        if (scene.content.type !== 'quiz') return <div>{t('stage.invalidQuizContent')}</div>;
        return <QuizView key={scene.id} questions={scene.content.questions} sceneId={scene.id} />;
      case 'interactive':
        if (scene.content.type !== 'interactive') {
          return <div>{t('stage.invalidInteractiveContent')}</div>;
        }
        return <InteractiveRenderer content={scene.content} mode={mode} sceneId={scene.id} />;
      case 'pbl':
        if (scene.content.type !== 'pbl') return <div>{t('stage.invalidPblContent')}</div>;
        return <PBLRenderer content={scene.content} mode={mode} sceneId={scene.id} />;
      default:
        return <div>{t('stage.unknownSceneType')}</div>;
    }
  }, [mode, scene, t]);

  return <div className="w-full h-full">{renderer}</div>;
}
